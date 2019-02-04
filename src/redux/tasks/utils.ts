import { CronJob } from 'cron';
import { NodeMisrcon } from 'node-misrcon';
import { getConnection } from 'typeorm';

import Task from '../../db/entities/Task';
import { Dispatch, GetStateFunc, RootState } from '../redux-types';
import { serverCredentialsById } from '../servers/selectors';

/*
 Adds a task to the database and returns the added task making sure to keep the job
  */
export const addTaskToDatabase = async (taskToAdd: Task): Promise<Task> => {
  const taskRepo = await getConnection().getRepository(Task);
  return { ...taskRepo.save({ ...taskToAdd }), job: taskToAdd.job };
};

/*
Remove Task from the sqlite database
 */
export const removeTaskFromDatabase = async (id: number) =>
  getConnection()
    .createQueryBuilder()
    .delete()
    .from(Task)
    .where({ id })
    .execute();

/*
Toggles a task in the database by id
 */
export const toggleTaskInDatabase = async (id: number) => {
  const connection = await getConnection();
  const task = await connection.getRepository(Task).findOneOrFail({ id });
  connection
    .createQueryBuilder()
    .update(Task)
    .set({ active: !task.active })
    .where({ id })
    .execute();
};

/*
Returns either a cronString or a Date or throws an error
 */
export const getCronStringOrDate = (task: Task) => {
  if (task.cronString) {
    return task.cronString;
  }
  if (task.date) {
    return task.date;
  }
  throw new Error('Task is missing Cron String or Date');
};

/*
Takes a Task from the database and populates the CronJob and returns it
 */
export const createRunningJobFromDb = (
  task: Task,
  dispatch: Dispatch,
  getState: () => RootState
): Task => {
  const job = new CronJob(
    getCronStringOrDate(task),
    task.onTick(dispatch, getState, task),
    () => null,
    task.active,
    task.timeZone
  );
  return {
    ...task,
    job
  };
};

export const defaultRCONCommand = (
  dispatch: Dispatch,
  getState: GetStateFunc,
  task: Task
) => {
  // Initialize RCON
  const credentials = serverCredentialsById(getState(), task.serverId);
  const rcon = new NodeMisrcon(credentials);
  return async () => {
    console.log(credentials, rcon, dispatch);
  };
};

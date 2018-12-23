import { CronJob } from 'cron';
import * as moment from 'moment-timezone';
import { getConnection } from 'typeorm';

import Task from '../../db/entities/Task';
import { Dispatch } from '../redux-types';
import { getTasksThunk } from './actions';
import { IRunningRCONTask, ITask } from './types';

/*
Takes in a single stored Task from  the database and returns an ITask with a running cron job ready to add to state
 */
export const createRunningJobFromDb = (
  task: Task,
  dispatch: Dispatch
): ITask => {
  const cronString: string | Date = '* * * * * *';
  // create our onTick function by evaling the jobString and then executing it with dispatch as a function
  // tslint:disable-next-line
  const onTick = eval(task.jobString)(dispatch);
  const onComplete = () => {
    return;
  };
  const start: boolean = task.active;
  const timeZone: string = task.timeZone;
  const context: any = false;
  const runOnInit: boolean = task.active;
  return {
    id: task.id,
    cronString,
    timeZone: task.timeZone,
    date: task.date,
    name: task.name,
    active: task.active,
    job: new CronJob(
      cronString,
      onTick,
      onComplete,
      start,
      timeZone,
      context,
      runOnInit
    )
  };
};

/*
Accepts params to create a Task with Running CronJob
 */
export const createRunningRCONTask = (
  {
    cronString,
    command,
    id = 0,
    date = null,
    timeZone = moment.tz.guess(),
    active = true,
    name = 'RCON Scheduled Task'
  }: IRunningRCONTask,
  dispatch: Dispatch
): ITask => {
  const job = new CronJob(
    cronString,
    makeSendRCON(command, dispatch),
    undefined,
    active,
    timeZone,
    null,
    active
  );
  return { id, date, cronString, timeZone, active, job, name };
};

const makeSendRCON = (_: string, dispatch: Dispatch) => () => {
  // TODO: WTF is going on here? Fix this function
  console.log(dispatch(getTasksThunk()));
  console.log(`Sending RCON Command`);
};

/*
 Convert from ITask to a Task type then add the task to the database
  */
export const addTaskToDatabase = async (newTask: ITask) => {
  const taskRepo = await getConnection().getRepository(Task);
  const task = new Task();
  task.active = newTask.active;
  task.id = newTask.id;
  task.cronString = newTask.cronString;
  task.timeZone = newTask.timeZone;
  task.name = newTask.name;
  // @ts-ignore
  const callbacks = newTask.job._callbacks as any[];
  // Get the call back and turn it into a function that accepts dispatch and return the original callback
  task.jobString = `(dispatch) => ${callbacks[0]}`;
  task.id = newTask.id;
  taskRepo.save(task);
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
Returns true if it updates a task false if it doesn't
 */
export const toggleTaskInDatabase = async (id: number) => {
  const connection = await getConnection();
  const task = await connection.getRepository(Task).findOne({ id });

  if (task) {
    connection
      .createQueryBuilder()
      .update(Task)
      .set({ active: !task.active })
      .where({ id })
      .execute();
    return true;
  } else {
    throw new Error('Task Does not exist in DB');
  }
};

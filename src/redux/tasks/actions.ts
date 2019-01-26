import { getConnection } from 'typeorm';
import { createAsyncAction } from 'typesafe-actions';

import Task from '../../db/entities/Task';
import { AsyncThunkResult, ThunkResult } from '../redux-types';
import { ITask, TasksState } from './types';
import {
  addTaskToDatabase,
  createRunningJobFromDb,
  removeTaskFromDatabase,
  toggleTaskInDatabase
} from './utils';

export const getTasksThunk = (): ThunkResult<TasksState> => (_, getState) =>
  getState().tasks;

export const toggleTaskEnabled = createAsyncAction(
  'tasks/TOGGLE_REQUEST',
  'tasks/TOGGLE_SUCCESS',
  'tasks/TOGGLE_FAILURE'
)<void, number, string>();
export const toggleTaskThunk = (
  id: number
): AsyncThunkResult<boolean> => async dispatch => {
  try {
    dispatch(toggleTaskEnabled.request());
    await toggleTaskInDatabase(id);
    dispatch(toggleTaskEnabled.success(id));
    return true;
  } catch (e) {
    dispatch(toggleTaskEnabled.failure(e.toString()));
    return false;
  }
};

/*
Adds a task to the database and to state and the reducers starts the tasks
 */
export const addTask = createAsyncAction(
  'tasks/ADD_REQUEST',
  'tasks/ADD_SUCCESS',
  'tasks/ADD_FAILURE'
)<void, ITask, void>();
export const addTaskThunk = (
  newTask: ITask
): AsyncThunkResult<void> => async dispatch => {
  try {
    dispatch(addTask.request());
    await addTaskToDatabase(newTask);
    dispatch(addTask.success(newTask));
  } catch (e) {
    dispatch(addTask.failure());
  }
};

/*
Removes a task from the database and sends the removed task id to the reducer to have it be stopped and removed from
local state
 */
export const removeTask = createAsyncAction(
  'tasks/REMOVE_REQUEST',
  'tasks/REMOVE_SUCCESS',
  'tasks/REMOVE_FAILURE'
)<void, number, string>();
export const removeTaskThunk = (
  partial: Partial<ITask>
): AsyncThunkResult<void> => async dispatch => {
  try {
    dispatch(removeTask.request());
    const tasks = await dispatch((_, gs) => gs()).tasks;
    const key = Object.keys(partial)[0];
    const val = partial[key];
    const task = tasks.find(t => t[key] === val);

    if (task) {
      await removeTaskFromDatabase(task.id);
      dispatch(removeTask.success(task.id));
      return;
    }
    dispatch(removeTask.failure('No Task Found'));
  } catch (e) {
    dispatch(removeTask.failure(e.toString()));
  }
};

/*
Gets the stored tasks from the database and hydrates the store.
This function creates cron jobs and starts them so it should only be run once or all other jobs should be
canceled first
 */
export const hydrateTasksFromDb = createAsyncAction(
  'tasks/HYDRATE_REQUEST',
  'tasks/HYDRATE_SUCCESS',
  'tasks/HYDRATE_FAILED'
)<void, TasksState, string>();
export const hydrateTasksFromDbThunk = (): AsyncThunkResult<
  void
> => async dispatch => {
  try {
    dispatch(hydrateTasksFromDb.request());
    const tasks = await getConnection()
      .getRepository(Task)
      .find({});
    dispatch(
      hydrateTasksFromDb.success(
        tasks.map(t => ({ ...createRunningJobFromDb(t, dispatch) }))
      )
    );
  } catch (e) {
    dispatch(hydrateTasksFromDb.failure(e.toString()));
  }
};

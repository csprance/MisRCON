import { getConnection } from 'typeorm';
import { createAsyncAction } from 'typesafe-actions';

import Task from '../../db/entities/Task';
import { AsyncThunkResult, ThunkResult } from '../redux-types';
import { makeTaskByIDSelector } from './selectors';
import { TasksState } from './types';
import {
  addTaskToDatabase,
  createRunningJobFromDb,
  removeTaskFromDatabase,
  toggleTaskInDatabase
} from './utils';

export const getTasksThunk = (): ThunkResult<TasksState> => (_, getState) =>
  getState().tasks;

/*
Toggle a task
Stops/Starts the running CronJob and marks active true/false
 */
export const toggleTask = createAsyncAction(
  'tasks/TOGGLE_REQUEST',
  'tasks/TOGGLE_SUCCESS',
  'tasks/TOGGLE_FAILURE'
)<void, number, string>();
export const toggleTaskThunk = (id: number): AsyncThunkResult<void> => async (
  dispatch,
  getState
) => {
  try {
    dispatch(toggleTask.request());
    const task = makeTaskByIDSelector(id)(getState());
    if (task && task.job) {
      task.job.stop();
    }
    await toggleTaskInDatabase(id);
    // Updated the task in state
    dispatch(toggleTask.success(id));
  } catch (e) {
    dispatch(toggleTask.failure(e.toString()));
  }
};

/*
 * Adds a task to the database
 * start the CronJob
 * add task to state
 */
export const addTask = createAsyncAction(
  'tasks/ADD_REQUEST',
  'tasks/ADD_SUCCESS',
  'tasks/ADD_FAILURE'
)<void, Task, string>();
export const addTaskThunk = (
  task: Task
): AsyncThunkResult<void> => async dispatch => {
  try {
    dispatch(addTask.request());
    dispatch(addTask.success(await addTaskToDatabase(task)));
  } catch (e) {
    dispatch(addTask.failure(e.toString()));
  }
};

/*
 * Removes a task from the database
 * Stops the CronJob
 * Remove from state by ID
 */
export const removeTask = createAsyncAction(
  'tasks/REMOVE_REQUEST',
  'tasks/REMOVE_SUCCESS',
  'tasks/REMOVE_FAILURE'
)<void, number, string>();
export const removeTaskThunk = (id: number): AsyncThunkResult<void> => async (
  dispatch,
  getState
) => {
  try {
    dispatch(removeTask.request());
    const task = makeTaskByIDSelector(id)(getState());
    if (task) {
      if (task.job) {
        task.job.stop();
      }
      await removeTaskFromDatabase(task.id);
      dispatch(removeTask.success(task.id));
    }
    dispatch(removeTask.failure('No Task Found'));
  } catch (e) {
    dispatch(removeTask.failure(e.toString()));
  }
};

/*
 * Gets task from Database
 * Starts all CronJobs that need to be started
 * Adds All Tasks to State
 */
export const hydrateTasksFromDb = createAsyncAction(
  'tasks/HYDRATE_REQUEST',
  'tasks/HYDRATE_SUCCESS',
  'tasks/HYDRATE_FAILED'
)<void, TasksState, string>();
export const hydrateTasksFromDbThunk = (): AsyncThunkResult<void> => async (
  dispatch,
  getState
) => {
  try {
    dispatch(hydrateTasksFromDb.request());
    const tasks = await getConnection()
      .getRepository(Task)
      .find({});
    const tasksWithCronJobs = tasks.map(task =>
      createRunningJobFromDb(task, dispatch, getState)
    );
    dispatch(hydrateTasksFromDb.success(tasksWithCronJobs));
  } catch (e) {
    dispatch(hydrateTasksFromDb.failure(e.toString()));
  }
};

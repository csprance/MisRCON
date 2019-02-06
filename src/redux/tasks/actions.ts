import { CronJob } from 'cron';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { AsyncThunkResult } from '../redux-types';
import { makeTaskByIDSelector } from './selectors';
import { Task } from './types';
import { getCronStringOrDate } from './utils';

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
  dispatch(toggleTask.request());
  try {
    const task = makeTaskByIDSelector()(getState(), { id });
    if (task && task.job) {
      if (!task.active) {
        task.job.start();
      } else {
        task.job.stop();
      }
    }
    dispatch(toggleTask.success(id));
  } catch (e) {
    dispatch(toggleTask.failure(e.toString()));
  }
};

/*
 * start the CronJob
 * add task to state
 */
export const addTask = createAsyncAction(
  'tasks/ADD_REQUEST',
  'tasks/ADD_SUCCESS',
  'tasks/ADD_FAILURE'
)<void, Task, string>();
export const addTaskThunk = (task: Task): AsyncThunkResult<void> => async (
  dispatch,
  getState
) => {
  try {
    dispatch(addTask.request());
    task.job = new CronJob(
      getCronStringOrDate(task),
      task.onTick(dispatch, getState, task),
      () => null,
      task.active,
      task.timeZone
    );
    if (task.active) {
      task.job.start();
    }
    dispatch(addTask.success(task));
  } catch (e) {
    dispatch(addTask.failure(e.toString()));
  }
};

/*
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
    const task = makeTaskByIDSelector()(getState(), { id });
    if (task) {
      if (task.job) {
        task.job.stop();
      }
      dispatch(removeTask.success(task.id));
      return;
    }
    dispatch(removeTask.failure('No Task Found'));
  } catch (e) {
    dispatch(removeTask.failure(e.toString()));
  }
};

export const incrementTask = createAction(
  'task/INCREMENT_TASK',
  resolve => (id: number) => resolve(id)
);

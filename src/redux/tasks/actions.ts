import { createAction } from 'typesafe-actions';

import { ThunkResult } from '../redux-types';
import { ITask, TasksState } from './types';

export const getTasksThunk = (): ThunkResult<TasksState> => (_d, getState) =>
  getState().tasks;

export const addTask = createAction('tasks/ADD', resolve => (task: ITask) =>
  resolve(task)
);

export const removeTaskByID = createAction(
  'tasks/REMOVE_BY_ID',
  resolve => (id: number) => resolve(id)
);
export const removeTaskByName = createAction(
  'tasks/REMOVE_BY_NAME',
  resolve => (name: string) => resolve(name)
);
export const removeTaskByCronString = createAction(
  'tasks/REMOVE_BY_CRON_STRING',
  resolve => (cronString: string) => resolve(cronString)
);

export const toggleTaskEnabled = createAction(
  'tasks/TOGGLE_ENABLED',
  resolve => (id: number) => resolve(id)
);

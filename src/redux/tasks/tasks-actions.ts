import { createAction } from 'typesafe-actions';
import { ITask } from './tasks-types';


export const addTask = createAction(
  'tasks/ADD',
  resolve => (task: ITask) => resolve(task)
);

export const removeTask = createAction(
  'tasks/REMOVE',
  resolve => (id: number) => resolve(id)
);

export const toggleTaskEnabled = createAction(
  'tasks/TOGGLE_ENABLED',
  resolve => (id: number) => resolve(id)
);
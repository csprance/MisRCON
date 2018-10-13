import { ActionType, getType } from 'typesafe-actions';
import * as tasksActions from './actions';
import { default as defaultState } from './state';
import { TasksState } from './types';

export type TasksActions = ActionType<typeof tasksActions>;

export default (
  state: TasksState = defaultState,
  action: TasksActions
): TasksState => {
  switch (action.type) {
    case getType(tasksActions.hydrateFromDb.success):
      return action.payload;

    case getType(tasksActions.addTask.success):
      return [...state, action.payload];

    case getType(tasksActions.removeTask.success):
      return state.filter(task => {
        if (task.id === action.payload) {
          task.job.stop();
          return false;
        }
        return true;
      });

    case getType(tasksActions.toggleTaskEnabled.success):
      return state.map(task => {
        if (task.id === action.payload) {
          task.active = !task.active;
          if (!task.active) {
            task.job.stop();
          }
          if (task.active) {
            task.job.start();
          }
        }
        return task;
      });
    default:
      return state;
  }
};

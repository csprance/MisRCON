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
    case getType(tasksActions.addTask):
      return [...state, action.payload];
    case getType(tasksActions.removeTaskByID):
      return state.filter(task => task.id !== action.payload);

    case getType(tasksActions.removeTaskByName):
      return state.filter(task => task.name !== action.payload);

    case getType(tasksActions.removeTaskByCronString):
      return state.filter(task => task.cronString !== action.payload);


    case getType(tasksActions.toggleTaskEnabled):
      return state.map(task => {
        if (task.id === action.payload) {
          task.enabled = !task.enabled;
        }
        return task;
      });
    default:
      return state;
  }
};

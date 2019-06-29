import { getType } from 'typesafe-actions';
import * as tasksActions from './actions';
import { TasksActions } from './index';
import { default as defaultState } from './state';
import { TasksState } from './types';

export default (
  state: TasksState = defaultState,
  action: TasksActions
): TasksState => {
  switch (action.type) {
    case getType(tasksActions.hydrateTasks.success):
      return action.payload;

    case getType(tasksActions.addTask.success):
      return [...state, action.payload];

    case 'task/INCREMENT_TASK':
      return state.map(task => ({
        ...task,
        timesRun: task.id === action.payload ? task.timesRun + 1 : task.timesRun
      }));

    case getType(tasksActions.removeTask.success):
      return state.filter(task => task.id !== action.payload);

    case getType(tasksActions.toggleTask.success):
      return state.map(task => ({
        ...task,
        active: action.payload === task.id ? !task.active : task.active
      }));

    default:
      return state;
  }
};

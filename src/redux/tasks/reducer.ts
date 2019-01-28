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
    case getType(tasksActions.hydrateTasksFromDb.success):
      return action.payload;

    case getType(tasksActions.addTask.success):
      return [...state, action.payload];

    case getType(tasksActions.removeTask.success):
      return state.filter(task => task.id !== action.payload);

    case getType(tasksActions.toggleTask.success):
      return state.map(task =>
        task.id === action.payload ? { ...task, active: !task.active } : task
      );

    default:
      return state;
  }
};

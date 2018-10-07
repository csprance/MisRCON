import {ActionType, getType} from 'typesafe-actions';
import * as tasksActions from './tasks-actions';
import {default as defaultState} from './tasks-state';
import {TasksState} from './tasks-types';


export type TaskActions = ActionType<typeof tasksActions>;

export const reducer = (
  state: TasksState = defaultState,
  action: TaskActions
): TasksState => {
  switch (action.type) {
    case getType(tasksActions.addTask):
      return [...state, action.payload];
    case getType(tasksActions.removeTask):
      return state.filter(todo => todo.id  !== action.payload);
    case getType(tasksActions.toggleTaskEnabled):
      return state.map(task => {
        if (task.id === action.payload){
          task.enabled = !task.enabled;
        }
        return task;
      });
    default:
      return state;
  }
};

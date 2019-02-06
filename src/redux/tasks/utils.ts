import { Dispatch, GetStateFunc } from '../redux-types';
import { Task } from './types';
/*
Returns either a cronString or a Date or throws an error
 */
export const getCronStringOrDate = (task: Task) => {
  if (task.cronString) {
    return task.cronString;
  }
  if (task.date) {
    return task.date;
  }
  throw new Error('Task is missing Cron String or Date');
};

export const defaultRCONCommand = (
  dispatch: Dispatch,
  _getState: GetStateFunc,
  task: Task
) => {
  // Initialize RCON
  return async () => {
    dispatch({ type: 'task/INCREMENT_TASK', payload: task.id });
  };
};

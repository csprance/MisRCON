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

export const makeDefaultRCONCommand = () => {
  return (dispatch: Dispatch, getState: GetStateFunc, task: Task) => {
    // Initialize RCON
    return async () => {
      const { NodeMisrcon } = require('node-misrcon');

      const { ip, port, password } = getState().servers.find(
        server => server.id === task.serverId
      )!;

      const rcon = new NodeMisrcon({ ip, port, password });
      try {
        await rcon.send(task.command);
        dispatch({ type: 'task/INCREMENT_TASK', payload: task.id });
      } catch (e) {
        console.log(e);
      }
    };
  };
};

export const defaultRCONCommand = (
  dispatch: Dispatch,
  getState: GetStateFunc,
  task: Task
) => {
  // Initialize RCON
  return async () => {
    const { NodeMisrcon } = require('node-misrcon');

    const { ip, port, password } = getState().servers.find(
      server => server.id === task.serverId
    )!;

    const rcon = new NodeMisrcon({ ip, port, password });
    console.log(rcon);

    dispatch({ type: 'task/INCREMENT_TASK', payload: task.id });
  };
};

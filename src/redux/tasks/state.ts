import Task from '../../db/entities/Task';
import { OnTickFunctionFactory, TasksState } from './types';

/*
This is a function factory that takes dispatch, getState
returns a Function to run on each tick
 */
export const defaultOnTick: OnTickFunctionFactory = (
  dispatch: any,
  getState: any
) => async () => {
  console.log('Default Tick', dispatch, getState);
};

export const defaultRecurringTask: Task = {
  id: 0,
  cronString: '9 9 * * * *',
  timeZone: 'New York',
  date: null,
  name: 'Default cron',
  active: true,
  job: null,
  serverId: 0,
  onTick: defaultOnTick
};
export const defaultDateTask: Task = {
  ...defaultRecurringTask,
  cronString: null,
  date: new Date(Date.now())
};

export default [defaultRecurringTask, defaultDateTask] as TasksState;

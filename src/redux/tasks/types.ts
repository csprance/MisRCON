// All the types associated with the state from the db
import { CronJob } from 'cron';
import { ActionType } from 'typesafe-actions';
import * as tasksActions from './actions';

export interface Task {
  id: number;
  timeZone: string;
  name: string;
  active: boolean;
  cronString: string | null;
  date: Date | null;
  serverId: number;
  job: CronJob | null;
  onTick: OnTickFunctionFactory;
  timesRun: number;
  command: string;
}

export type VoidPromise = () => Promise<void>;

export type OnTickFunctionFactory = (
  dispatch: any,
  getState: any,
  task: Task
) => VoidPromise;
export type TasksState = Task[];

export type TasksActions = ActionType<typeof tasksActions>;

// All the types associated with the state from the db
import { CronJob } from 'cron';

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
}

export type VoidPromise = () => Promise<void>;

export type OnTickFunctionFactory = (
  dispatch: any,
  getState: any,
  task: Task
) => VoidPromise;
export type TasksState = Task[];

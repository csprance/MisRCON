// All the types associated with the state from the db
import { CronJob } from 'cron';

export interface ITask {
  // The id of the task
  id: number;
  // Cron String describing when the task should run
  cronString: string | null;
  // Time String
  timeZone: string;
  // Date describing when the command should be run
  date: Date | null;
  // The name of the task
  name: string;
  // Is the task currently running
  active: boolean;
  // The running CronJob
  job: CronJob;
}
export interface IRunningRCONTask {
  command: string;
  cronString: string;
  id?: number;
  timeZone?: string;
  date?: Date | null;
  name?: string;
  active?: boolean;
}

export type TasksState = ITask[];

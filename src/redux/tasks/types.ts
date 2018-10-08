// All the types associated with the state from the db
export interface ITask  {
  // The id of the task
  id: number;
  // Cron String describing when the task should run
  cronString: string | false;
  // Date describing when the command should be run
  date: Date | false;
  // The name of the task
  name: string;
  // Is the task currently running
  enabled: boolean;
  // The job to run
  job: any;

}
export type TasksState = ITask[];
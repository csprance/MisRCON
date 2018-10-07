// All the types associated with the state from the db
export interface ITask  {
  id: number;
  // Is the task currently running
  enabled: boolean;
  // The job to run
  job: any;

}
export type TasksState = ITask[];
// All the types associated with the state from the db
import Task from '../../db/entities/Task';

export type VoidPromise = () => Promise<void>;

export type OnTickFunctionFactory = (
  dispatch: any,
  getState: any,
  task: Task
) => VoidPromise;
export type TasksState = Task[];

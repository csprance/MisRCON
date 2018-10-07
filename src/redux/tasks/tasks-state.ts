// The Default state for the db
import { TasksState } from './tasks-types';

export default [
  {
    id: 0,
    job: {
      run: true
    },
    enabled: true
  }
] as TasksState;

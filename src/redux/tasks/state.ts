import { TasksState } from './types';

export default [
  {
    id: 0,
    cronString: '* * * * * *',
    date: false,
    name: 'test recurring',
    enabled: true,
    job: {
      command: 'status'
    }
  },
  {
    id: 1,
    cronString: '6 6 6 6 6 6',
    date: false,
    name: 'test recurring 2',
    enabled: true,
    job: {
      command: 'status'
    }
  },
  {
    id: 2,
    cronString: false,
    date: Date.now(),
    name: 'test specific',
    enabled: true,
    job: {
      command: 'status'
    }
  }
] as TasksState;

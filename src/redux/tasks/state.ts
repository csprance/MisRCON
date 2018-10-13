import { CronJob } from 'cron';
import { TasksState } from './types';

export const makeDefaultCron = () =>
  new CronJob('* * * * * *', () => ({}), () => ({}), false, 'America/New_York');

export default [
  {
    id: 0,
    cronString: '* * * * * *',
    timeZone: 'New York',
    date: null,
    name: 'test recurring',
    active: true,
    job: makeDefaultCron()
  }
] as TasksState;

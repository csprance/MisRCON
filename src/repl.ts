import { convertStringToJob } from './redux/tasks/utils';

const job = convertStringToJob('() => {console.log("Job Running")}', {
  id: 0,
  cronString: '* * * * * *',
  timeZone: 'America/New_York',
  date: null,
  name: 'test recurring',
  active: true,
  job: 'null'
});

console.log(job());


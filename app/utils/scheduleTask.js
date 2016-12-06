import cron from  'node-schedule';
import moment from 'moment';
import parse from 'date-fns/parse';

/**
 * schedules a task to run at a RECURRING time given
 * some params
 * @param:    {string}    taskCommand     command of the task to run
 * @param:    {string}    taskCronString  the cronTime object of the task {second, minute, hour, day, month, day of week}
 * @returns:  {CronJob}   cron            the CronJob task can do .cancel()
 */
export function scheduleTaskAtTime(taskCommand, taskCronString) {
  // Log it
  console.log('Scheduling recurring task to run: ', taskCronString);

  return cron.scheduleJob(taskCronString, function () {
    //TODO: XMLRPC send command to server
    console.log('Sending command to server: ', taskCommand);
  });
}

/**
 * schedules a task to run at a SPECIFIC date and time given
 * some params
 * @param:    {string}      taskCommand     command of the task to run
 * @param:    {Date}        timeOfTask    the Date() HH:MM:SS of task
 * @param:    {Date}        dateOfTask    the Date() DD/MM/YY of task
 * @returns:  {CronJob}     cron          the CronJob task can do .cancel()
 */
export function scheduleTaskAtDateTime(taskCommand, dateOfTask, timeOfTask) {


  // add the dateOfTask to the timeOfTask
  let date = moment(dateOfTask);

  let time = moment(timeOfTask);


  date.set('hour', time.get('hour'));
  date.set('minute', time.get('minute'));
  date.set('second', time.get('second'));

  console.log('Scheduling Specific Date task to run: ', date.format());

  return cron.scheduleJob(date.toDate(), function () {
    //TODO: XMLRPC send command to server
    console.log('Sending command to server: ', taskCommand);
  });
}

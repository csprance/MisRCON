import cron from  'node-schedule';
import moment from 'moment';
import parse from 'date-fns/parse';
import store from 'store';
import {sendCommandToServer} from '../utils/sendCommandToServer';
/**
 * schedules a task to run at a RECURRING time given
 * some params
 * @param:    {string}    taskCommand     command of the task to run
 * @param:    {string}    taskCronString  the cronTime object of the task {second, minute, hour, day, month, day of week}
 * @returns:  {CronJob}   cron            the CronJob task can do .cancel()
 */
export function scheduleTaskAtTime(taskCommand, taskCronString, logger) {
  // Log it
  console.log('Scheduling recurring task to run: ', taskCronString);

  // create our credentials object
  let storedCreds = store.get('userCredentials');
  let creds = {
    ip: storedCreds.ip,
    port: storedCreds.port,
    password: storedCreds.password
  };

  return cron.scheduleJob(taskCronString, function () {
    sendCommandToServer(taskCommand, creds).then((res) => {
      console.log(res);
      logger(res.data);
    });
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
  // Log it
  console.log('Scheduling task at date to run: ', dateOfTask);

  // create our credentials object
  let storedCreds = store.get('userCredentials');
  let creds = {
    ip: storedCreds.ip,
    port: storedCreds.port,
    password: storedCreds.password
  };

  // add the dateOfTask to the timeOfTask
  let date = moment(dateOfTask);

  let time = moment(timeOfTask);


  date.set('hour', time.get('hour'));
  date.set('minute', time.get('minute'));
  date.set('second', time.get('second'));

  console.log('Scheduling Specific Date task to run: ', date.format());

  return cron.scheduleJob(date.toDate(), function () {
    //TODO: XMLRPC send command to server
    sendCommandToServer(taskCommand, creds).then((res) => {
      console.log(res);
    });
  });
}

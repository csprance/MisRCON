import cron from  'node-schedule';
import store from 'store';
import {log} from './loggerUtils';
import {sendCommandToServer} from '../utils/sendCommandToServer';
import {replaceTimeOfDate} from '../utils/dateUtils';
/**
 * schedules a task to run at a RECURRING time given
 * some params
 * @param:    {string}    taskCommand     command of the task to run
 * @param:    {string}    taskCronString  the cronTime object of the task {second, minute, hour, day, month, day of week}
 * @returns:  {CronJob}   cron            the CronJob task can do .cancel()
 */
export function scheduleTaskAtTime(taskCommand, taskCronString) {
  // Log it
  log('info', 'Scheduling recurring task to run: '+ taskCronString);

  // create our credentials object
  let storedCreds = store.get('userCredentials');
  let creds = {
    ip: storedCreds.ip,
    port: storedCreds.port,
    password: storedCreds.password
  };

  return cron.scheduleJob(taskCronString, function () {
    log('info', 'Sending recurring scheduled task command to server' + taskCommand);
    sendCommandToServer(taskCommand, creds)
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



  // create our credentials object
  let storedCreds = store.get('userCredentials');
  let creds = {
    ip: storedCreds.ip,
    port: storedCreds.port,
    password: storedCreds.password
  };

  // add the dateOfTask to the timeOfTask
  let date = replaceTimeOfDate(timeOfTask, dateOfTask);

  // Log it
  log('info',`Scheduling Specific Date task to run: ${date.format()} running command ${taskCommand}`);

  return cron.scheduleJob(date.toDate(), function () {
    log('info', 'Sending specific date task command to server' + taskCommand);
    sendCommandToServer(taskCommand, creds)
  });
}

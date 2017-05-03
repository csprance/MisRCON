import cron from 'node-schedule';
import store from 'store';
import misrcon from 'node-misrcon';

import { log } from './loggerUtils';
import { replaceTimeOfDate } from '../utils/dateUtils';


/**
 * schedules a task to run at a RECURRING time given
 * some params
 * @param:    {string}    taskCommand     command of the task to run
 * @param:    {string}    taskCronString  the cronTime object of the task {second, minute, hour, day, month, day of week}
 * @returns:  {CronJob}   cron            the CronJob task can do .cancel()
 */
export function scheduleTaskAtTime(taskCommand, taskCronString) {
  // Log it
  log('info', `Scheduling recurring task to run: ${taskCronString}`);

  // create our credentials object
  const storedCreds = store.get('userCredentials');
  const creds = {
    ip: storedCreds.ip,
    port: storedCreds.port,
    password: storedCreds.password
  };

  return cron.scheduleJob(taskCronString, function () {
    log('info', `Sending recurring scheduled task command to server${taskCommand}`);
    misrcon.sendRCONCommandToServer({...creds, command: taskCommand});
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
  const storedCreds = store.get('userCredentials');
  const creds = {
    ip: storedCreds.ip,
    port: storedCreds.port,
    password: storedCreds.password
  };

  // add the dateOfTask to the timeOfTask
  const date = replaceTimeOfDate(timeOfTask, dateOfTask);

  // Log it
  log('info', `Scheduling Specific Date task to run: ${date.format()} running command ${taskCommand}`);

  return cron.scheduleJob(date.toDate(), function () {
    log('info', `Sending specific date task command to server${taskCommand}`);
    misrcon.sendRCONCommandToServer({...creds, command: taskCommand});
  });
}

/**
 * schedules a task to run at a RECURRING time given
 * some params
 * @param    {Object}      task     command of the task to run
 * @returns  {cron}     cron          the CronJob task can do .cancel()
 */
export function _scheduleTaskAtTime(task) {
  return cron.scheduleJob(task.cronString, () => {
    misrcon.sendRCONCommandToServer(task);
  });
}

/**
 * schedules a task to run at a SPECIFIC date and time given
 * some params
 * @param    {Object}      task     command of the task to run
 * @returns  {cron}     cron          the CronJob task can do .cancel()
 */
export function _scheduleTaskAtDateTime(task) {
  return cron.scheduleJob(replaceTimeOfDate(task.timeOfTask, task.dateOfTask).toDate(), () => {
    misrcon.sendRCONCommandToServer(task);
  });
}

/**
 * Bootstraps the app with the initials tasks
 */
export const bootstrap = () => {
  store.get('savedTasks', []);
};

/**
 * Gets task from the localStorage if there is any tasks
 * if not it returns an empty array
 * @return {array}       Array containing tasks
 */
export const getTasksFromLocalStorage = () => {
  return store.get('savedTasks');
};

/**
 * removes task from the localStorage
 * @param    {string}      task     name of the localStorage Task
 */
export const addTaskToLocalStorage = (task) => {
  store.set('savedTasks', [].concat(store.get('savedTasks'), [task]));
};

/**
 * removes task from the localStorage
 * @param    {string}      name     name of the localStorage Task
 */
export const removeTaskFromLocalStorageByName = (name) => {
  store.set('savedTasks', store.get('savedTasks').filter(task => task.name !== name));
};

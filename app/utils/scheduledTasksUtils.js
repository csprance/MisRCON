//TODO: Document incRunsByOne incrementTaskInLocalStorageByName
import cron from 'node-schedule';
import store from 'store';
import * as misrcon from 'node-misrcon';

import * as taskActions from '../actions/scheduledTasksActions';

import { log } from './loggerUtils';
import { replaceTimeOfDate } from '../utils/dateUtils';


/**
 * schedules a task to run at a RECURRING time given some params
 * {timeOfTask: Date, dateOfTask: Date, command: '', cronString: '', ip: '', port: '', password: '', taskType: ''}
 * @param    {Object}      task     command of the task to run
 * @param    {function}      dispatch     redux dispatch
 * @returns  {cron}     cron          the CronJob task can do .cancel()
 */
export function scheduleCronStringTask(task, dispatch) {
  return cron.scheduleJob(task.cronString, () => {
    misrcon.sendRCONCommandToServer(task)
      .then(res => {
        log('info', `${task.command} Response: \n ${res}`);
        dispatch(taskActions.incrementTaskByName(task.name));
      })
      .catch(() => {
        log('info', `Error running recurring task: ${task.command}`);
      });
  });
}


/**
 * schedules a task to run at a SPECIFIC date and time given some params
 * {time: Date, date: Date, command: '', cronString: '', ip: '', port: '', password: '', type: ''}
 * @param    {Object}      task     command of the task to run
 * @param    {function}      dispatch     redux dispatch
 * @returns  {cron}     cron          the CronJob task can do .cancel()
 */
export function scheduleDateTimeTask(task, dispatch) {
  return cron.scheduleJob(replaceTimeOfDate(task.time, task.date).toDate(), () => {
    misrcon.sendRCONCommandToServer(task)
      .then(res => {
        log('info', `${task.command} Response: \n ${res}`);
        dispatch(taskActions.incrementTaskByName(task.name));
      })
      .catch(() => {
        log('info', `Error running specific task: ${task.command}`);
      });
  });
}


/**
 * Bootstraps the app with the initials tasks
 */
export const bootstrap = () => {
  if (store.get('savedTasks') === undefined) {
    store.set('savedTasks', []);
  }
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
 * adds task to the localStorage or update it
 * @param    {string}      newTask     name of the localStorage Task
 */
export const addTaskToLocalStorage = (newTask) => {
  store.set('savedTasks', [].concat(store.get('savedTasks').filter(task => task.name !== newTask.name), newTask));
};


/**
 * removes task from the localStorage
 * @param    {string}      name     name of the localStorage Task
 */
export const removeTaskFromLocalStorageByName = (name) => {
  store.set('savedTasks', store.get('savedTasks').filter(task => task.name !== name));
};


export const incRunsByOne = (i, name) => (i.name === name ? {...i, runs: i.runs + 1} : i);


// increase the run amount by one in local storage
export function incrementTaskInLocalStorageByName(name) {
  store.set('savedTasks', store.get('savedTasks').map(task => incRunsByOne(task, name)));
}

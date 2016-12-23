/**
 * Name: dateUtils
 * Author: Chrissprance
 * Creation Date: 12/7/2016
 * Description: some random dateUtil functions I need
 */
import moment from 'moment';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

/**
 * Replaces the time of a date [time, date]
 * @param:    {Date}     timeOfTask    the Date() HH:MM:SS of task
 * @param:    {Date}     dateOfTask    the Date() DD/MM/YY of task
 * @returns:  {Date}     date          the new date object
 */
export function replaceTimeOfDate(timeOfTask, dateOfTask) {
  // add the dateOfTask to the timeOfTask
  let date = moment(dateOfTask);
  let time = moment(timeOfTask);
  date.set('hour', time.get('hour'));
  date.set('minute', time.get('minute'));
  date.set('second', time.get('second'));
  return date
}

/**
 * Convert time to date by adding current date if no date provided Date.now() used
 * @param:    {string}   timeOfTask    HH:MM:SS.mmm 00:43:11.186 Time stamp
 * @param:    {Date}     dateOfTask    the Date() DD/MM/YY of task - throws away time aspect
 * @returns:  {Date}     date          the new date object
 */
export function convertTimeStrToDate(timeOfTask, dateOfTask = Date.now()) {
  // add the dateOfTask to the timeOfTask
  return parse(format(dateOfTask, 'YYYY-MM-DDT') + timeOfTask + 'Z');
}

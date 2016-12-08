/**
 * Name: dateUtils
 * Author: Chrissprance
 * Creation Date: 12/7/2016
 * Description: some random dateUtil functions I need
 */
import moment from 'moment';


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

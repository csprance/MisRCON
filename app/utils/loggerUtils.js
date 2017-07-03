/**
 * Name: loggerUtils
 * Author: Chrissprance
 * Creation Date: 12/8/2016
 * Description: contains a few functions to log things to a file
 */
import fs from 'fs';
import format from 'date-fns/format';

/**
 * Replaces the time of a date [time, date]
 * @param:    {string}  lvl  the log level to log at [silly, debug, info, warn, error] defaults to info
 * @param:    {msg}     msg  the msg or object to log out
 */
export function log(lvl = 'info', msg) {
  const logPath = 'misrcon.log';
  const logMsg = `${format(Date.now(), 'MM/DD/YY @ HH:mm:ss')} - [${lvl}] - ${msg}\n\n`;
  // some things we don't want to log to a file what are they?
  const doNotLogToFile = ['silly', 'debug'];

  // create our log file if it doesn't exist
  fs.closeSync(fs.openSync(logPath, 'a'));

  if (doNotLogToFile.indexOf(lvl) > -1) {
    // Only console log these types of log levels
    console.log(logMsg);
  } else {
    // if it's not in the ignore file log list then log it to a file
    fs.appendFile(logPath, logMsg, err => {
      if (err) console.log(err);
    });
  }
}

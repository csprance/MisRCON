import Promise from 'bluebird';

import {log} from './loggerUtils';
/**
 * Sends a command via XMLRPC  to a server and returns a promise response
 * @param:    {string}      command       command to send to the server
 * @param:    {object}      credentials   object containing  user credentials
 *                                        {ip:[ip], port:[port], password:[password]}
 * @return:   {promise}     response      returns a promise
 */
export function sendCommandToServer(command, creds) {
  // Log it
  log('info',`Sending command: ${command} to server: ${creds.ip}:${creds.port}`);

  return new Promise(function (resolve, reject) {
    const execFile = require('child_process').execFile;
    execFile(String(process.cwd() + '/resources/misrcon_cli.exe'),
      //misrcon.exe -i [ip] --port [admin port] -p [admin password] --command [command] --time [exec_time] --s [schedule]
      ['-i', creds.ip, '--port', creds.port, '-p', creds.password, '--command', command],
      (error, stdout, stderr) => {
        if (error) {
          log('error', `Error running task: ${command} to ${creds.ip}:${creds.port}`);
          log('error', stderr);
          reject(stderr)
        }
        resolve(stdout);
      });
  });
}

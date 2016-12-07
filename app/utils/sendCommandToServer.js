import axios from 'axios';

// import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;
// import md5 from 'md5';
//require('./jquery.xmlrpc');


/**
 * Sends a command via XMLRPC  to a server and returns the response
 * @param:    {string}      command       command to send to the server
 * @param:    {object}      credentials   object containing  user credentials
 *                                        {ip:[ip], port:[port], password:[password]}
 * @return:   {string}      response      returns a response message back from the server
 */
export function sendCommandToServer(command, creds) {

  return axios.post(`http://miscreatedgame.com/servers/api/rcon_client.py?command=${command}&ip=${creds.ip}&password=${creds.password}&port=${creds.port}`);

  //let serverUrl = `http://${creds.ip}:${creds.port}/rpc2`;
  // $.xmlrpc({
  //   url: serverUrl,
  //   methodName: 'challenge',
  //   success: function (response, status, jqXHR) {
  //
  //     if (response[0] !== '[Whitelist] Invalid command: challenge\n') {
  //       $.xmlrpc({
  //         url: serverUrl,
  //         methodName: 'authenticate',
  //         params: [md5(response[0] + ':' + creds.password)],
  //         success: function (response, status, jqXHR) {
  //           if (response[0] === 'authorized') {
  //             $.xmlrpc({
  //               url: serverUrl,
  //               methodName: command,
  //               params: [],
  //               success: function (response, status, jqXHR) {
  //                 console.log(response);
  //                 logger(response[0])
  //               },
  //               error: function (jqXHR, status, error) {
  //                 console.log('in command sending');
  //                 console.log(jqXHR, status, error);
  //               }
  //             });
  //           }
  //         },
  //         error: function (jqXHR, status, error) {
  //           console.log('in auth');
  //           console.log(jqXHR, status, error);
  //         }
  //       });
  //     }else{
  //       logger('failed', jqXHR);
  //     }
  //   },
  //   error: function (jqXHR, status, error) {
  //     console.log('in challenge');
  //     console.log(jqXHR, status, error);
  //   }
  // });
}

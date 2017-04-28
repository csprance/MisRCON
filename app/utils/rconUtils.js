/**
 * Name: rconUtils
 * Created by chris on 4/26/2017.
 * Description: Sends a command to a Miscreated server and parses the response
 */
const axios = require('axios');
const Promise = require('bluebird');
const {parseString}  = require('xml2js');
const md5 = require('md5');
const http = require('http');

/**
 * Sends a command via XMLRPC  to a server and returns a promise response
 * @constructor
 * @param {Object} options   object containing  user credentials and command
 *                           {ip:[ip], port:[port], password:[password], command: [command]}
 * @returns{promise} response      returns a promise that resolves to a String
 */
const sendRCONCommandToServer = (options) => {
  // return a promise so we can use .then(res=> function );
  return new Promise(function (resolve, reject) {

    // the server url to send the commands to
    const serverUrl = `http://${options.ip}:${options.port}/rpc2`;

    // axios config
    const config = {
      headers: {'Content-Type': 'text/xml'},
      httpAgent: new http.Agent({keepAlive: true}),
    };

    // create the initial challenge string to send to the server
    const challengeString = `<methodCall><methodName>challenge</methodName><params></params></methodCall>`;

    // send the initial challenge
    axios.post(serverUrl, challengeString, config).then(res => {
      let upTime = '';
      // response looks like this
      // <methodResponse><params><param><value><string>31268616.000000</string></value></param></params></methodResponse>
      //get the uptime by parsing the xml
      parseString(res.data, (err, result) => {
        upTime = result.methodResponse.params[0].param[0].value[0].string[0];
      });

      // create challengeResponse String
      // by doing md5(uptime:password)
      let challengeResponse = `<methodCall><methodName>authenticate</methodName><params><param><value><string>${md5(`${upTime}:${options.password}`)}</string></value></param></params></methodCall>`;

      // send the challenge response back to the server
      return axios.post(serverUrl, challengeResponse, config);

    }).then(res => {

      // handle auth error
      handleAuthError(res.data, reject);

      // build the command to send to the server from the user
      let commandString = `<methodCall><methodName>${options.command}</methodName><params></params></methodCall>`;
      axios.post(serverUrl, commandString, config).then(res => {
        let parsedResponse = '';
        parseString(res.data, (err, result) => {
          // parse the response
          parsedResponse = result.methodResponse.params[0].param[0].value[0].string[0];
          // send our parsed string back
          resolve(parsedResponse);
        });
      });
    })
  });
};


// stub function
// sometimes auth passes after a few tries it just keeps the connection open
// Handle auth failed here
// response looks like this
// <?xml version="1.0"?><methodResponse><params><param><value><string>authorized</string></value></param></params></methodResponse>
const handleAuthError = (data, reject) => {
  parseString(data, (err, result) => {
    let authResults = result.methodResponse.params[0].param[0].value[0].string[0];
    console.log('authResults: ', authResults);
    // if (authResults !== 'authorized') {
    //   reject('Incorrect Password');
    // }
  });
};


// Other useful tools


const JSONifyStatus = (statusString) => {
  let serverStatusString = getServerStatus(statusString);
  let serverStatusObject = getStatusObjectFromString(serverStatusString);

  let playersString = getPlayersString(statusString);
  let playersArray = splitPlayerStringRowsIntoArray(playersString);

  return {
    serverStatus: serverStatusObject,
    players: playersArray
  }
};


const getServerStatus = (str) => {
  const regex = /-*[\s\S]*- */g;
  let regArray = regex.exec(str);
  if (regArray.length !== 1)
    return regArray.length > 1 ? regArray[0] : regArray[1];
  else
    return str.replace(regex, '')
};


const getStatusObjectFromString = (str) => {

  const serverNameRE = new RegExp('name: (.*)\n');
  const ipRE = new RegExp('ip: (.*)\n');
  const versionRE = new RegExp('version: (.*)\n');
  const levelRE = new RegExp('level: (.*)\n');
  const gamerulesRE = new RegExp('gamerules: (.*)\n');
  const playersRE = new RegExp('players: (.*)\n');

  return {
    name: serverNameRE.exec(str) !== null ? serverNameRE.exec(str)[1] : '',
    ip: ipRE.exec(str) !== null ? ipRE.exec(str)[1] : '',
    version: versionRE.exec(str) !== null ? versionRE.exec(str)[1] : '',
    level: levelRE.exec(str) !== null ? levelRE.exec(str)[1] : '',
    gameRules: gamerulesRE.exec(str) !== null ? gamerulesRE.exec(str)[1] : '',
    players: playersRE.exec(str) !== null ? playersRE.exec(str)[1] : ''
  };

};


const getPlayersString = (str) => {
  let pString = /Server Status:[\s\S]*.*/g;
  let newStr = pString.exec(String(str));
  return newStr[0].replace('Server Status:\n', '');
};


const splitPlayerStringRowsIntoArray = (str) => {
  let stringArray = str.split('\n');
  let playersArray = [];

  const steamIdRE = new RegExp('steam: (.*)  name:');
  const nameRE = new RegExp('name: (.*)  entID:');
  const entIDRE = new RegExp('entID:(.*)  id:');
  const idRE = new RegExp('id:(.*)  ip:');
  const ipRE = new RegExp('ip:(.*)  ping:');
  const pingRE = new RegExp('ping:(.*)  state:');
  const stateRE = new RegExp('state:(.*)  profile:');
  const profileRE = new RegExp('profile: (.*)');

  stringArray.forEach((player) => {
    playersArray.push({
      steam: steamIdRE.exec(player) !== null ? steamIdRE.exec(player)[1] : '',
      name: nameRE.exec(player) !== null ? nameRE.exec(player)[1] : '',
      entID: entIDRE.exec(player) !== null ? entIDRE.exec(player)[1] : '',
      id: idRE.exec(player) !== null ? idRE.exec(player)[1] : '',
      ip: ipRE.exec(player) !== null ? ipRE.exec(player)[1] : '',
      ping: pingRE.exec(player) !== null ? pingRE.exec(player)[1] : '',
      state: stateRE.exec(player) !== null ? stateRE.exec(player)[1] : '',
      profile: profileRE.exec(player) !== null ? profileRE.exec(player)[1] : '',
    });
  });

  return playersArray.filter((player) => {
    return player.steam !== ''
  })
};


module.exports = {
  sendRCONCommandToServer,
  JSONifyStatus
};

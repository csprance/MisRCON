/**
 * Name: JSONifyStatus
 * Author: Chrissprance
 * Creation Date: 12/9/2016
 * Description: takes a string of a status command and JSONifys it.
 */
import {sendCommandToServer} from './sendCommandToServer';

function getServerStatus(str) {
  console.log(str);
  const regex = /-*[\s\S]*- */g;
  return regex.exec(str)[0];
}


function getStatusObjectFromString(str) {
  const serverNameRE = new RegExp('name: (.*)\r');
  const ipRE = new RegExp('ip: (.*)\r');
  const versionRE = new RegExp('version: (.*)\r');
  const levelRE = new RegExp('level: (.*)\r');
  const gamerulesRE = new RegExp('gamerules: (.*)\r');
  const playersRE = new RegExp('players: (.*)\r');

  return {
    name: serverNameRE.exec(str) !== null ? serverNameRE.exec(str)[1] : '',
    ip: ipRE.exec(str) !== null ? ipRE.exec(str)[1] : '',
    version: versionRE.exec(str) !== null ? versionRE.exec(str)[1] : '',
    level: levelRE.exec(str) !== null ? levelRE.exec(str)[1] : '',
    gameRules: gamerulesRE.exec(str) !== null ? gamerulesRE.exec(str)[1] : '',
    players: playersRE.exec(str) !== null ? playersRE.exec(str)[1] : ''
  };

}


function getPlayersString(str) {
  let pString = /Connection Status:[\s\S]*.*/g;
  let newStr = pString.exec(String(str));
  return newStr[0].replace('Connection Status:\r', '');
}


function splitPlayerStringRowsIntoArray(str) {
  let stringArray = str.split('\r');
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
}


export function JSONifyStatus(statusString) {
  let serverStatusString = getServerStatus(statusString);
  let serverStatusObject = getStatusObjectFromString(serverStatusString);

  let playersString = getPlayersString(statusString);
  let playersArray = splitPlayerStringRowsIntoArray(playersString);


  return {
    serverStatus: serverStatusObject,
    players: playersArray
  }
}

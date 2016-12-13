/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/12/2016
 * Description: Gets the initial server data in a series of chained promises because we can't do multiple calls
 * to the server at once or the server hams up
 */
import {sendCommandToServer} from './sendCommandToServer';
import {JSONifyStatus} from './JSONifyStatus';
import JSONifyWhiteList from './JSONifyWhiteList';
import JSONifyBanList from './JSONifyBanList';

import {log} from './loggerUtils';

// getInitialServerData(creds).then((intitialData) => setState({ initialData: initialData}))
export default function getInitialServerData(creds) {
  log('info', 'Getting Initial Server Data');
  let resObj = {};

  return sendCommandToServer('status', creds)
    .then((res) => {
      getStatusResults(resObj, res);
      return sendCommandToServer('mis_whitelist_status', creds)
    })
    .then((res) => {
      //whitelist
      getWhiteListResults(resObj, res);
      return sendCommandToServer('mis_ban_status', creds)
    })
    .then((res) => {
      // banlist
      getBanListResults(resObj, res);
      return resObj
    })
    .catch((err) => {
      log(err);
    })
}

function getStatusResults(resObj, res) {
  let statusObj = JSONifyStatus(res);
  resObj.players = statusObj.players;
  resObj.status = statusObj.serverStatus;
}

function getWhiteListResults(resObj, res) {
  resObj.whiteListPlayers = JSONifyWhiteList(res).map((p) => {
    return {steam: p}
  });
}

function getBanListResults(resObj, res) {
  resObj.banListPlayers = JSONifyBanList(res).map((p) => {
    return {steam: p}
  });
}

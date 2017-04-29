/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/12/2016
 * Description: Gets the initial server data in a series of chained promises because we can't do multiple calls
 * to the server at once or the server hams up
 */
import * as misrcon from 'node-misrcon';

import { log } from './loggerUtils';

// getInitialServerData(options).then((intitialData) => setState({ initialData: initialData}))
export default async function getInitialServerData(creds) {
  log('info', 'Getting Initial Server Data');
  let data = {};

  data.status = await getStatusAndPlayers(creds);
  // data.banlist = await getBanList(creds);
  // data.whitelist = await getWhitelist(creds);

  // // get the status and players
  // return misrcon.sendRCONCommandToServer({...creds, command: 'status'}).then((status) => {
  //   data.status = misrcon.parseStatusResponseToJs(status);
  //
  //   // get the whitelist
  //   return misrcon.sendRCONCommandToServer({...creds, command: 'mis_whitelist_status'})
  // }).then((res) => {
  //   data.whitelist = misrcon.parseWhitelistResponseToJs(res);
  //
  //
  //   // get the banlist
  //   return misrcon.sendRCONCommandToServer({...creds, command: 'mis_ban_status'})
  // }).then((res) => {
  //   data.banlist = misrcon.parseBanListResponseToJs(res);
  //
  //
  //   // send the object back for react
  //   return data;
  // }).catch((err) => {
  //   // log any error
  //   log(err);
  // })
  return data;
}


async function getStatusAndPlayers(creds) {
  return await misrcon.sendRCONCommandToServer({...creds, command: 'status'}).then((status) => {
    return misrcon.parseStatusResponseToJs(status);
  });
}

async function getBanList(creds) {
  return await misrcon.sendRCONCommandToServer({...creds, command: 'mis_ban_status'}).then((status) => {
    return misrcon.parseBanListResponseToJs(status);
  });
}

async function getWhitelist(creds) {
  return await misrcon.sendRCONCommandToServer({...creds, command: 'mis_whitelist_status'}).then((status) => {
    return misrcon.parseWhitelistResponseToJs(status);
  });
}

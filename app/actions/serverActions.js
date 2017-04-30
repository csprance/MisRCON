/**
 * Name: rconActions
 * Created by chris on 4/27/2017.
 * Description:
 */
import * as misrcon from 'node-misrcon';

import * as notify from './notifyActions';
import * as actionType from '../constants/ActionTypes';


//////////////////////////////////////////////////////
// initialData Getter
//////////////////////////////////////////////////////
export function fetchingServerData() {
  return {
    type: actionType.FETCHING_ALL_SERVER_DATA,
  };
}
export function recievedServerData() {
  return {
    type: actionType.RECIEVED_ALL_SERVER_DATA,
  };
}
export function getInitialData() {
  return (dispatch, getState) => {
    dispatch(fetchingServerData());
    // get the status and players
    misrcon.sendRCONCommandToServer({...getState().credentials.active, command: 'status'}).then((status) => {
      dispatch(updateStatus(misrcon.parseStatusResponseToJs(status)));

      // get the whitelist
      return misrcon.sendRCONCommandToServer({...getState().credentials.active, command: 'mis_whitelist_status'})
    }).then((res) => {
      dispatch(updateWhitelist(misrcon.parseWhitelistResponseToJs(res)));


      // get the banlist
      return misrcon.sendRCONCommandToServer({...getState().credentials.active, command: 'mis_ban_status'})
    }).then((res) => {
      dispatch(updateBanList(misrcon.parseBanListResponseToJs(res)));
      dispatch(recievedServerData());


    }).catch((err) => {
      console.log(err);
      // log any error
      notify.emitError(err);
    })
  };
}


//////////////////////////////////////////////////////
// Status
//////////////////////////////////////////////////////
export function updateStatus(status) {
  return {
    type: actionType.UPDATE_SERVER_STATUS,
    payload: status
  }
}
export function getStatus() {
  return (dispatch, getState) => {
    misrcon.sendRCONCommandToServer({
      ...getState().credentials.active,
      command: 'status'
    }).then(statusResponseString => {
      // add it to status
      updateStatus(misrcon.parseStatusResponseToJs(statusResponseString));
    });
  };
}


//////////////////////////////////////////////////////
// Whitelist
//////////////////////////////////////////////////////
export function updateWhitelist(whitelist) {
  return {
    type: actionType.UPDATE_SERVER_WHITELIST,
    payload: whitelist
  }
}
export function getWhitelist() {
  return (dispatch, getState) => {
    misrcon.sendRCONCommandToServer({
      ...getState().credentials.active,
      command: 'mis_whitelist_status'
    }).then(whitelistResponseString => {
      updateWhitelist(misrcon.parseWhitelistResponseToJs(whitelistResponseString));
    });
  };
}
export function whitelistPlayer(steamid) {
  return (dispatch, getState) => {
    misrcon.sendRCONCommandToServer({
      ...getState().credentials.active,
      command: `mis_whitelist_add ${steamid}`
    }).then(whitelistPlayerResponseString => {
      updateWhitelist(getState().server.whitelist.push(steamid));
    });
  };
}
export function unWhitelistPlayer(steamid) {
  return (dispatch, getState) => {
    misrcon.sendRCONCommandToServer({
      ...getState().credentials.active,
      command: `mis_whitelist_remove ${steamid}`
    }).then(unWhitelistPlayerResponseString => {
      updateWhitelist(getState().server.whitelist.filter(x => x !== steamid));
    });
  };
}


//////////////////////////////////////////////////////
// Ban
//////////////////////////////////////////////////////
export function updateBanList(banList) {
  return {
    type: actionType.UPDATE_SERVER_BANLIST,
    payload: banList
  }
}
export function getBanList() {
  return (dispatch, getState) => {
    misrcon.sendRCONCommandToServer({
      ...getState().credentials.active,
      command: 'mis_ban_status'
    }).then(banListResponseString => {
      // add it to status
      updateBanList(misrcon.parseBanListResponseToJs(banListResponseString));
    });
  };
}
export function banPlayer(steamid) {
  return (dispatch, getState) => {
    misrcon.sendRCONCommandToServer({
      ...getState().credentials.active,
      command: `mis_ban_steamid ${steamid}`
    }).then(banPlayerResponseString => {
      updateBanList(getState().server.banlist.push(steamid));
    });
  };
}
export function unBanPlayer(steamid) {
  return (dispatch, getState) => {
    misrcon.sendRCONCommandToServer({
      ...getState().credentials.active,
      command: `mis_ban_remove ${steamid}`
    }).then(unBanPlayerResponseString => {
      updateBanList(getState().server.banlist.filter(x => x !== steamid));
    });
  };
}

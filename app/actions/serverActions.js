/**
 * Name: rconActions
 * Created by chris on 4/27/2017.
 * Description:
 */
import * as misrcon from 'node-misrcon';

import * as actionType from '../constants/ActionTypes';


//////////////////////////////////////////////////////
// initialData Getter
//////////////////////////////////////////////////////
export function fetchingServerData() {
  return {
    type: actionType.FETCHING_ALL_SERVER_DATA,
  };
}
export function recievedServerData(data) {
  return {
    type: actionType.RECIEVED_ALL_SERVER_DATA,
    payload: data
  };
}
export function getInitialData() {
  return (dispatch, getState) => {
    dispatch(fetchingServerData());

    misrcon.getAllServerData({...getState().credentials.active})
      .then((res) => {
        dispatch(recievedServerData(res));
      })
      .catch((e) => {
        throw e;
      });

  };
}

//////////////////////////////////////////////////////
// Status
//////////////////////////////////////////////////////
export function updateStatus(status) {
  return {
    type: actionType.UPDATE_SERVER_STATUS,
    payload: status
  };
}
export function fetchingStatus() {
  return {
    type: actionType.FETCHING_SERVER_STATUS
  };
}
export function getStatus() {
  return (dispatch, getState) => {
    dispatch(fetchingStatus());
    misrcon.sendRCONCommandToServer({
      ...getState().credentials.active,
      command: 'status'
    }).then(statusResponseString => {
      // add it to status
      updateStatus(misrcon.parseStatusResponseToJs(statusResponseString));
    }).catch(() => {
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
  };
}
export function fetchingWhitelist() {
  return {
    type: actionType.FETCHING_SERVER_WHITELIST
  };
}
export function getWhitelist() {
  return (dispatch, getState) => {
    dispatch(fetchingWhitelist());
    misrcon.sendRCONCommandToServer({
      ...getState().credentials.active,
      command: 'mis_whitelist_status'
    }).then(whitelistResponseString => {
      updateWhitelist(misrcon.parseWhitelistResponseToJs(whitelistResponseString));
    }).catch(() => {
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
    }).catch(() => {
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
    }).catch(() => {
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
  };
}
export function fetchingBanList() {
  return {
    type: actionType.FETCHING_SERVER_BANLIST
  };
}
export function getBanList() {
  return (dispatch, getState) => {
    dispatch(fetchingBanList());
    misrcon.sendRCONCommandToServer({
      ...getState().credentials.active,
      command: 'mis_ban_status'
    }).then(banListResponseString => {
      // add it to status
      updateBanList(misrcon.parseBanListResponseToJs(banListResponseString));
    }).catch(() => {
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
    }).catch(() => {
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
    }).catch(() => {
    });
  };
}

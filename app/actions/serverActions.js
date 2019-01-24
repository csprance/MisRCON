/**
 * Name: rconActions
 * Created by chris on 4/27/2017.
 * Description:
 */
import * as misrcon from 'node-misrcon';

import * as actionType from '../constants/ActionTypes';

// // // // // // // // //
// initialData Getter
// // // // // // // // //
export function fetchingServerData() {
  return {
    type: actionType.FETCHING_ALL_SERVER_DATA
  };
}
export function recievedServerData(data) {
  return {
    type: actionType.UPDATE_ALL_SERVER_DATA,
    payload: data
  };
}
export function getInitialData() {
  return (dispatch, getState) => {
    dispatch(fetchingServerData());
    misrcon
      .getAllServerData({ ...getState().credentials.active })
      .then(res => {
        dispatch(recievedServerData(res));
        return null;
      })
      .catch(e => {
        throw e;
      });
  };
}

// // // // // // // // //
// Status
// // // // // // // // //
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
export function fetchingFail() {
  return {
    type: actionType.FETCHING_FAIL
  };
}
export function getStatus() {
  return (dispatch, getState) => {
    dispatch(fetchingStatus());
    misrcon
      .sendRCONCommandToServer({
        ...getState().credentials.active,
        command: 'status'
      })
      .then(statusResponseString => {
        dispatch(
          updateStatus(misrcon.parseStatus(statusResponseString))
        );
        return null;
      })
      .catch(e => {
        console.log(e);
        dispatch(fetchingFail());
      });
  };
}

// // // // // // // // //
// Whitelist
// // // // // // // // //
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
    misrcon
      .sendRCONCommandToServer({
        ...getState().credentials.active,
        command: 'mis_whitelist_status'
      })
      .then(whitelistResponseString => {
        dispatch(
          updateWhitelist(
            misrcon.parseWhitelist(whitelistResponseString)
          )
        );
        return null;
      })
      .catch(e => {
        console.log(e);
        dispatch(fetchingFail());
      });
  };
}
export function whitelistPlayer(steamid) {
  return (dispatch, getState) => {
    misrcon
      .sendRCONCommandToServer({
        ...getState().credentials.active,
        command: `mis_whitelist_add ${steamid}`
      })
      .then(() => {
        dispatch(getWhitelist());
        return null;
      })
      .catch(e => {
        console.log(e);
        dispatch(fetchingFail());
      });
  };
}
export function unWhitelistPlayer(steamid) {
  return (dispatch, getState) => {
    misrcon
      .sendRCONCommandToServer({
        ...getState().credentials.active,
        command: `mis_whitelist_remove ${steamid}`
      })
      .then(() => {
        dispatch(getWhitelist());
        return null;
      })
      .catch(() => {});
  };
}

// // // // // // // // //
// Ban
// // // // // // // // //
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
    misrcon
      .sendRCONCommandToServer({
        ...getState().credentials.active,
        command: 'mis_ban_status'
      })
      .then(banListResponseString => {
        dispatch(
          updateBanList(misrcon.parseBanList(banListResponseString))
        );
        return null;
      })
      .catch(e => {
        console.log(e);
        dispatch(fetchingFail());
      });
  };
}
export function banPlayer(steamid) {
  return (dispatch, getState) => {
    misrcon
      .sendRCONCommandToServer({
        ...getState().credentials.active,
        command: `mis_ban_steamid ${steamid}`
      })
      .then(() => {
        dispatch(getBanList());
        return null;
      })
      .catch(() => {});
  };
}
export function unBanPlayer(steamid) {
  return (dispatch, getState) => {
    misrcon
      .sendRCONCommandToServer({
        ...getState().credentials.active,
        command: `mis_ban_remove ${steamid}`
      })
      .then(() => {
        dispatch(getBanList());
        return null;
      })
      .catch(() => {});
  };
}

// // // // // // // // //
// Kick
// // // // // // // // //
export function kickPlayer(steamid) {
  return (dispatch, getState) => {
    misrcon
      .sendRCONCommandToServer({
        ...getState().credentials.active,
        command: `mis_kick ${steamid}`
      })
      .then(() => {
        // add it to status
        dispatch(getStatus());
        return null;
      })
      .catch(() => {});
  };
}

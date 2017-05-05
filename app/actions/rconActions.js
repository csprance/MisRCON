/**
 * Name: rconActions
 * Created by chris on 4/27/2017.
 * Description:
 */
import misrcon from 'node-misrcon';

import * as notify from './notifyActions';
import * as actionType from '../constants/ActionTypes';

// the thunk action that sends the command and adds the response to state
export function sendRCONCommandToServer(command) {
  return (dispatch, getState) => {
    dispatch(rconSetCommand(command));
    dispatch(rconPending());
    misrcon.sendRCONCommandToServer({...getState().credentials.active, command}).then(res => {
      dispatch(rconRecieved(res));
    }).catch(e => {
      dispatch(notify.emitError(e));
    });
  };
}

export function rconSetCommand(cmd) {
  return {
    type: actionType.SET_RCON_COMMAND,
    payload: cmd
  };
}

export function rconPending() {
  return {
    type: actionType.SEND_RCON_COMMAND_PENDING
  };
}

export function rconRecieved(data) {
  return {
    type: actionType.SEND_RCON_COMMAND_RECEIVED,
    payload: data
  };
}

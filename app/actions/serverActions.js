/**
 * Name: rconActions
 * Created by chris on 4/27/2017.
 * Description:
 */
import * as actionType from '../constants/ActionTypes';
import * as credentials from './credentialsActions';
import * as rcon from './rconActions';

export function getStatus() {
  return (dispatch, getState) => {
    dispatch(rcon.sendRCONCommandToServer({...getState().credentials.active, command: 'status'}));
  };
}


export function getWhitelist() {
  return (dispatch, getState) => {
    dispatch(rcon.sendRCONCommandToServer({...getState().credentials.active, command: 'status'}));
  };
}

export function getBanList() {
  return (dispatch, getState) => {
    dispatch(rcon.sendRCONCommandToServer({...getState().credentials.active, command: 'status'}));
  };
}

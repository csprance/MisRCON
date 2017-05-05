/**
 * Name: notificationActions
 * Created by chris on 3/17/2017.
 * Description:
 */
import store from 'store';

import * as types from '../constants/ActionTypes';
import * as credentialsUtils from '../utils/credentialsUtils';


export function addCredentials(creds) {
  credentialsUtils.addCredentials(creds);
  return {
    type: types.ADD_CREDENTIALS,
    payload: creds
  };
}

export function removeCredentials(name) {
  credentialsUtils.removeCredentials(name);
  return {
    type: types.REMOVE_CREDENTIALS,
    payload: name
  };
}

export function useCredentials(name) {
  return {
    type: types.USE_CREDENTIALS,
    payload: name
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT
  };
}

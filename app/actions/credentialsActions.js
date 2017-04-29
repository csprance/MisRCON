/**
 * Name: notificationActions
 * Created by chris on 3/17/2017.
 * Description:
 */
import * as types from '../constants/ActionTypes';

export function addCredentials(creds) {
  return {
    type: types.ADD_CREDENTIALS,
    payload: creds
  }
}

export function removeCredentials(name) {
  return {
    type: types.REMOVE_CREDENTIALS,
    payload: name
  }
}

export function useCredentials(name) {
  return {
    type: types.USE_CREDENTIALS,
    payload: name
  }
}

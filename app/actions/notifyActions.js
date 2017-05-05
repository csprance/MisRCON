/**
 * Name: notificationActions
 * Created by chris on 3/17/2017.
 * Description:
 */
import * as types from '../constants/ActionTypes';


export function emitError(msg) {
  return {
    type: types.EMIT_ERROR,
    payload: msg
  };
}

export function emitWarning(msg) {
  return {
    type: types.EMIT_WARN,
    payload: msg
  };
}

export function emitInfo(msg) {
  return {
    type: types.EMIT_INFO,
    payload: msg
  };
}

export function dismissNotify() {
  return {
    type: types.DISMISS_NOTIFY,
  };
}



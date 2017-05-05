/**
 * Name: notifyReducer
 * Created by chris on 3/17/2017.
 * Description:
 */
import * as types from '../constants/ActionTypes';


const initialState = {
  err: false,
  warning: false,
  info: false,
  show: false,
  msg: '',
};

export default function notify(state = initialState, action) {
  switch (action.type) {
    case types.EMIT_INFO: {
      return {...state, info: true, msg: action.payload, show: true};
    }
    case types.EMIT_ERROR: {
      return {...state, err: true, msg: action.payload, show: true};
    }
    case types.EMIT_WARN: {
      return {...state, warning: true, msg: action.payload, show: true};
    }
    case types.DISMISS_NOTIFY: {
      return initialState;
    }
    default:
      return state;
  }
}

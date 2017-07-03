/**
 * Name: credentialsReducer
 * Created by chris on 3/17/2017.
 * Description:
 */
// TODO: Store these credentials better somehow
import * as types from '../constants/ActionTypes';

import { bootStrap, getStoredCredentials } from '../utils/credentialsUtils';

bootStrap();

const initialState = {
  active: { ip: '', port: '', password: '', name: '' },
  inactive: getStoredCredentials()
};

export default function credentials(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CREDENTIALS: {
      return { ...state, inactive: [].concat(state.inactive, action.payload) };
    }
    case types.REMOVE_CREDENTIALS: {
      return {
        ...state,
        inactive: state.inactive.filter(i => i.name !== action.payload)
      };
    }
    case types.USE_CREDENTIALS: {
      return {
        ...state,
        active: state.inactive.filter(i => i.name === action.payload)[0]
      };
    }
    case types.LOG_OUT: {
      return { ...state, active: initialState.active };
    }
    default:
      return state;
  }
}

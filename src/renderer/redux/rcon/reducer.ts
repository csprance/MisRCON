import { getType } from 'typesafe-actions';

import * as rconActions from './actions';
import { RCONState } from './index';
import { default as defaultState } from './state';
import { RCONActions } from './types';

export default (
  state: RCONState = defaultState,
  action: RCONActions
): RCONState => {
  switch (action.type) {
    case getType(rconActions.sendRCON.request):
      return { ...state, sending: true };

    case getType(rconActions.sendRCON.success):
      return {
        ...state,
        sending: false,
        requests: [action.payload, ...state.requests.slice(0, 50)]
      };

    case getType(rconActions.sendRCON.failure):
      return {
        ...state,
        sending: false,
        requests: [action.payload, ...state.requests.slice(0, 50)]
      };

    default:
      return state;
  }
};

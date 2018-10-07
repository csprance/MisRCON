import { ActionType, getType } from 'typesafe-actions';
import * as rconActions from './rcon-actions';
import { default as defaultState } from './rcon-state';
import { RCONState } from './rcon-types';

type RCONActions = ActionType<typeof rconActions>;

export const reducer = (
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
        requests: [...state.requests, action.payload]
      };
    case getType(rconActions.sendRCON.failure):
      return {
        ...state,
        sending: false,
        requests: [...state.requests, action.payload]
      };
    default:
      return state;
  }
};

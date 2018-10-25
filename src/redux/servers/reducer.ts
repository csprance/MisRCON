import { ActionType, getType } from 'typesafe-actions';
import * as serversActions from './actions';
import { default as defaultState } from './state';
import { ServersState } from './types';

export type ServersActions = ActionType<typeof serversActions>;

export default (
  state: ServersState = defaultState,
  action: ServersActions
): ServersState => {
  switch (action.type) {
    case getType(serversActions.hydrateFromDb.success):
      return action.payload;
    default:
      return state;
  }
};

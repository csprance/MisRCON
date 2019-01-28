import { getType } from 'typesafe-actions';
import * as serversActions from './actions';
import { default as defaultState } from './state';
import { ServersActions, ServersState } from './types';

export default (
  state: ServersState = defaultState,
  action: ServersActions
): ServersState => {
  switch (action.type) {
    case getType(serversActions.hydrateServersFromDb.success):
      return action.payload;
    default:
      return state;
  }
};

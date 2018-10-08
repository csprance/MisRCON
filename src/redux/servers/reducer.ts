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
    case getType(serversActions.addServer):
      return state.concat(action.payload);

    case getType(serversActions.removeServer):
      return state.filter(server => server.id !== action.payload);

    case getType(serversActions.markActive):
      return state.map(server => ({
        ...server,
        active: server.id !== action.payload
      }));

    default:
      return state;
  }
};

import { getType } from 'typesafe-actions';
import * as serversActions from './actions';
import { default as defaultState } from './state';
import { ServersActions, ServersState } from './types';

export default (
  state: ServersState = defaultState,
  action: ServersActions
): ServersState => {
  switch (action.type) {
    case getType(serversActions.updateServer.success):
      // Filter the old server id out and add the new one in
      return [
        ...state.filter(server => server.id !== action.payload.id),
        action.payload
      ];

    case getType(serversActions.addServer.success):
      return [...state, action.payload];

    case getType(serversActions.markServerActive.request):
      return state.map(server => ({
        ...server,
        active: server.id === action.payload
      }));

    case getType(serversActions.removeServer.success):
      return state.filter(server => server.id !== action.payload);

    default:
      return state;
  }
};

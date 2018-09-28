import { ActionType, getType } from 'typesafe-actions';
import * as serversActions from './servers-actions';
import { default as defaultState } from './servers-state';
import { ServersState } from './servers-types';

export type ServersState = ServersState;
export type DbActions = ActionType<typeof serversActions>;

export const reducer = (
  state: ServersState = defaultState,
  action: DbActions
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

import { createSelector } from 'reselect';
import { RootState } from '../redux-types';
import { defaultServer } from './state';

export const serversSelector = (state: RootState, _props?: any) =>
  state.servers;

export const activeServerSelector = createSelector(
  serversSelector,
  servers => {
    const activeServer = servers.find(server => server.active);
    return activeServer ? activeServer : defaultServer;
  }
);

export const activeServerIDSelector = createSelector(
  activeServerSelector,
  activeServer => activeServer.id
);

export const activeServerCredentialsSelector = createSelector(
  activeServerSelector,
  ({ ip, port, password }) => ({ ip, port, password })
);

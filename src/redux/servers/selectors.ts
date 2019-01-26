import { createSelector } from 'reselect';
import { RootState } from '../redux-types';
import { defaultServer } from './state';

export const serverSelector = (state: RootState, _props?: any) => state.servers;

export const activeServerSelector = createSelector(
  serverSelector,
  servers => {
    const activeServer = servers.find(server => server.active);
    return activeServer ? activeServer : defaultServer;
  }
);

export const activeServerCredentialsSelector = createSelector(
  activeServerSelector,
  ({ ip, port, hash }) => ({ ip, port, password: hash })
);

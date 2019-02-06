import { createSelector } from 'reselect';
import { RootState } from '../redux-types';
import { idPropsSelector, ipPortPropsSelector } from '../selectors';
import { defaultServer } from './state';

export const serversSelector = (state: RootState, _props?: any) =>
  state.servers;

export const serverByIpPortSelector = createSelector(
  serversSelector,
  ipPortPropsSelector,
  (servers, { ip, port }) => {
    const matchedServer = servers.find(
      server => server.ip === ip && server.port === port
    );
    if (!matchedServer) {
      throw Error('No Server by that IpPort');
    }
    return matchedServer;
  }
);

export const activeServerSelector = createSelector(
  serversSelector,
  servers => {
    const activeServer = servers.find(server => server.active);
    return activeServer ? activeServer : defaultServer;
  }
);
export const serverByIdSelector = createSelector(
  serversSelector,
  idPropsSelector,
  (servers, id) => servers.find(server => server.id === id)
);

export const activeServerIDSelector = createSelector(
  activeServerSelector,
  activeServer => activeServer.id
);

export const activeServerCredentialsSelector = createSelector(
  activeServerSelector,
  ({ ip, port, password }) => ({ ip, port, password })
);

export const serverCredentialsById = createSelector(
  serverByIdSelector,
  server => {
    if (!server) {
      throw Error('No Server Found');
    }
    return { ip: server.ip, port: server.port, password: server.password };
  }
);

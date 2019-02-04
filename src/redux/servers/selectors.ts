import { createSelector } from 'reselect';
import { RootState } from '../redux-types';
import { defaultServer } from './state';

export const propsSelector = (_: RootState, props: any) => props;

export const serversSelector = (state: RootState, _props?: any) =>
  state.servers;

export const activeServerSelector = createSelector(
  serversSelector,
  servers => {
    const activeServer = servers.find(server => server.active);
    return activeServer ? activeServer : defaultServer;
  }
);
export const serverByIdSelector = createSelector(
  serversSelector,
  propsSelector,
  (servers, props) => servers.find(server => server.id === props.id)
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

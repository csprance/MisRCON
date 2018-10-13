import { RootState } from '../redux-types';
import { defaultServer } from './state';
import { IServer } from './types';

export const getActiveServer = (state: RootState): IServer => {
  const active = state.servers.find(server => server.active);
  if (active) {
    return active;
  }
  return defaultServer;
};

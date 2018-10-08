import { RootState } from '../redux-types';
import { IServer } from './types';

export const getActiveServer = (state: RootState) =>
  state.servers.find(server => server.active) as IServer;

import { IRootState } from '../index';
import { IServer } from './servers-types';

export const getActiveServer = (state: IRootState) =>
  state.servers.find(server => server.active) as IServer;

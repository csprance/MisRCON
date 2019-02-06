import { createAction } from 'typesafe-actions';
import { Server } from './types';

export const addServer = createAction(
  'server/ADD',
  resolve => (server: Server) => resolve(server)
);

export const markServerActive = createAction(
  'server/MARK_ACTIVE',
  resolve => (id: number) => resolve(id)
);

export const removeServer = createAction(
  'server/REMOVE',
  resolve => (id: number) => resolve(id)
);


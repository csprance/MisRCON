import { createAction } from 'typesafe-actions';
import { Server } from './servers-types';

export const addServer = createAction(
  'servers/ADD_SERVER',
  resolve => (server: Server) => resolve(server)
);

export const removeServer = createAction(
  'servers/REMOVE_SERVER',
  resolve => (id: number) => resolve(id)
);

export const markActive = createAction(
  'servers/MARK_ACTIVE',
  resolve => (id: number) => resolve(id)
);

import { createAction } from 'typesafe-actions';
import { IServer } from './types';

export const addServer = createAction(
  'servers/ADD_SERVER',
  resolve => (server: IServer) => resolve(server)
);

export const removeServer = createAction(
  'servers/REMOVE_SERVER',
  resolve => (id: number) => resolve(id)
);

export const markActive = createAction(
  'servers/MARK_ACTIVE',
  resolve => (id: number) => resolve(id)
);

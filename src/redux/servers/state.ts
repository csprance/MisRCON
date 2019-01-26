// The Default state for the db
import { IServer, ServersState } from './types';

export const defaultServer: IServer = {
  id: 0,
  name: 'loading',
  ip: 'loading',
  port: 0,
  hash: 'THisIsCool324HashMan',
  active: true,
  selfHosted: false,
  rootPath: ''
};

export default [] as ServersState;

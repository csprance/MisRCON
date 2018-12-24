// The Default state for the db
import { IServer, ServersState } from './types';

export const defaultServer: IServer = {
  id: 'loading',
  name: 'loading',
  ip: 'loading',
  port: -1,
  hash: 'THisIsCool324HashMan',
  active: true,
  selfHosted: false,
  rootPath: ''
};

export default [] as ServersState;

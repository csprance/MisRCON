// The Default state for the db
import { ServersState } from './servers-types';

export default [
  {
    id: 0,
    name: 'Dev Server',
    ip: '192.168.1.1',
    port: 60490,
    hash: 'THisIsCool324HashMan',
    active: false
  }
] as ServersState;

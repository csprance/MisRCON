// The Default state for the db
import secretServers from '../../secrets'
import { ServersState } from './types';

export default [
  ...secretServers,
  {
    id: 1,
    name: 'US75',
    ip: '192.168.2.1',
    port: 60499,
    hash: 'THisIsCool324HashMan',
    active: false
  }
] as ServersState;

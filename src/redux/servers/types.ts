import { ActionType } from 'typesafe-actions';

import * as serversActions from './actions';

export interface Server {
  id: number;
  // The nice name of the server
  name: string;
  // The ip port of the server 192.168.1.1
  ip: string;
  // The port 64094
  port: number;
  // The password
  password: string;
  // Is the server currently active
  active: boolean;
  // Is it a self hosted server?
  selfHosted: boolean;
  // The root path for the self hosted server
  rootPath: string;
  // The location of the avatar for the server
  avatar: string;
}

export type ServersActions = ActionType<typeof serversActions>;

export type ServersState = Server[];

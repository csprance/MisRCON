import { SteamID } from 'node-misrcon';
import { ActionType } from 'typesafe-actions';

import { actions } from './index';

export interface Ping {
  id: number; // Id of the ping metric Primary Key
  playerID: SteamID; // Steam ID (64) of the user
  ping: number; // The Ping of the player
  date: number; // Date.now() at which ping metric was taken
  serverID: number; // Server in which they were on with that ping
}

export type PingState = Ping[];

export type PingActions = ActionType<typeof actions>;

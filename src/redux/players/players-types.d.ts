import { IPlayer as NMIPlayer } from 'node-misrcon/dist/types/types';

// All the types associated with the state from the db
export interface IPlayer extends NMIPlayer {
  avatarUrl: string;
  notes: string;
  banned: boolean;
  whitelisted: boolean;
}
export type PlayersState = IPlayer[];

import * as misrcon from 'node-misrcon';

// All the types associated with the state from the db
export interface IPlayer extends misrcon.IPlayer {
  avatarUrl: string;
  notes: string;
  banned: boolean;
  whitelisted: boolean;
}
export type PlayersState = IPlayer[];

import Player from "../../db/entities/Player";

// All the types associated with the state from the db
export interface IPlayer extends Player {
  id: number;
  // What server the player is currently on or was last on or null if they are not on a server
  active: boolean;
  // The current or last server the player was on
  serverID: number;
  // A url to steam of the players avatar
  avatarUrl: string;
  // Any custom notes about the player
  notes: string;
  // An array of ServerIDS the player is banned on
  banned: number[];
  // A list of the servers a player is whitelisted on
  whitelisted: number[];
}
export type PlayersState = IPlayer[];

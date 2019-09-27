export interface Player {
  // /////////////////////
  // Application Values - These are internal values from the
  // application to use
  // ///////////////
  // Is the player currently active
  active: boolean;
  // The current or last server the player was on
  serverID: number;
  // A url to steam of the players avatar
  avatarUrl: string;
  // The color of the players name
  color: string;
  // Any custom notes about the player
  notes: string;
  // An array of ServerIDS the player is banned on
  banned: number[];
  // A list of the servers a player is whitelisted on
  whitelisted: number[];
  // A list of the servers a player has been on
  seenOn: number[];
  // The location code based on the IP of the player.
  location: string;

  // /////////////////////
  // RCON Values - These all come from the servers status result
  // ///////////////
  // The players Steam ID
  steam: string;
  // The players name on the server
  name: string;
  // A value from the rcon response that is the id of the
  // player on the server
  id: number;
  entID: number;
  ip: string;
  ping: number;
  state: number;
  profile: number;
}

export type PlayersState = Player[];

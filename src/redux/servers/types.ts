// All the types associated with the state from the db
export interface IServer {
  // The ID of the Server
  id: string;
  // The Friendly Name of the Server
  name: string;
  // The Ip Address of the Game Server
  ip: string;
  // Admin Port of the Game Server
  port: number;
  // The Hash is the RCON Password Hashed with the Users Hashed Password this way we can convert it back and forth and never have to store
  // any passwords assuming the user inputs the correct password
  hash: string;
  // Is this server active
  active: boolean;
}


export type ServersState = IServer[];

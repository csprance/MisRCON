
// This is the actual request object in a normalized form for our appState
export interface IRCONRequest {
  ip: string;
  port: number;
  password: string;
  // The command to send to the server
  command: string;
  // The time the request was executed
  date: number;
  // Did the request succeed?
  completed: boolean;
  // The data from the server
  response: string;
}
export type RCONState = {
  // Is the rcon sending?
  sending: boolean;
  // A history of all of the sent requests
  requests: IRCONRequest[]
};
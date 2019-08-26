import { parseResponse } from 'node-misrcon';
import { IRCONRequest, RCONState } from './types';
const mockStatusResponse = `-----------------------------------------
Server Status:
name: Server Loading
ip: Server50425
version: 0.1.1.1988
level: Multiplayer/islands
gamerules: Miscreated
time: 07:52
players: 0/50
round time remaining: 0:00
uptime: 09:24:19
next restart in: 02:34:30
weather: ClearSky
weatherpattern: 1
`;

export const defaultRequest: IRCONRequest = {
  id: -1,
  ip: 'localhost',
  port: 64094,
  password: 'password',
  // The command sent to the server
  command: 'test',
  // The time the request was executed
  date: Date.now(),
  // Did the request succeed?
  completed: false,
  // The data from the server
  response: 'Error Not a Command',
  // the parsed response
  parsedResponse: false
};

export const defaultStatusRequest: IRCONRequest = {
  id: -1,
  ip: 'localhost',
  port: 64094,
  password: 'password',
  // The command sent to the server
  command: 'status',
  // The time the request was executed
  date: Date.now(),
  // Did the request succeed?
  completed: true,
  // The data from the server
  response: mockStatusResponse,
  // the parsed response
  parsedResponse: parseResponse(mockStatusResponse)
};

export const state: RCONState = {
  sending: false,
  requests: [defaultRequest, defaultStatusRequest]
};
export default state;

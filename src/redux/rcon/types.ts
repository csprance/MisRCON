// This is the actual request object in a normalized form for our appState
import { ParseResponse } from 'node-misrcon';
import { ActionType } from 'typesafe-actions';
import * as rconActions from './actions';

export interface IRCONRequest {
  // The ID of the server
  id: number;
  //
  ip: string;
  //
  port: number;
  //
  password: string;
  // The command sent to the server
  command: string;
  // The time the request was executed
  date: number;
  // Did the request succeed?
  completed: boolean;
  // The data from the server
  response: string;
  // the parsed response
  parsedResponse: ParseResponse;
}

export type RCONState = {
  // Is the rcon sending?
  sending: boolean;
  // A history of all of the sent requests
  requests: IRCONRequest[];
};

export type RCONActions = ActionType<typeof rconActions>;

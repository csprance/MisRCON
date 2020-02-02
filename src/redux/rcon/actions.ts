import { ICommandObject, NodeMisrcon, parseResponse } from 'node-misrcon';
import { createAsyncAction } from 'typesafe-actions';

import { logRCONError, logRCONResponse } from '../../lib/logger';
import {
  clearBanlistForServerByID,
  clearWhitelistForServerByID,
  markAllPlayersInactive,
  syncPlayerBanlistThunk,
  syncPlayerThunk,
  syncPlayerWhitelistThunk
} from '../players/actions';
import { AsyncThunkResult } from '../redux-types';
import { IRCONRequest } from './types';

export const sendRCON = createAsyncAction(
  'rcon/REQUEST',
  'rcon/SUCCESS',
  'rcon/FAILED'
)<string, IRCONRequest, IRCONRequest>();
export const sendRCONAsyncThunk = ({
  ip,
  port,
  password,
  command,
  id
}: ICommandObject & { id: number }): AsyncThunkResult<
  IRCONRequest
> => async dispatch => {
  // We don't do anything with the request action but it's nice to have it known in the logger
  dispatch(sendRCON.request(command));
  // Initialize our request object and rcon api
  const rcon = new NodeMisrcon({ ip, port, password });
  const request: IRCONRequest = {
    id,
    response: '',
    command,
    date: Date.now(),
    ip,
    port,
    password: '[redacted]',
    completed: true,
    parsedResponse: false
  };
  try {
    // Try to do the rcon request
    request.response = await rcon.send(command);
    request.date = Date.now();
    request.parsedResponse = parseResponse(request.response);

    // /////////////////////////
    // ! Intercept Requests here - Update state with the results of requests made here
    // ////////////////////////

    // * Intercept Status
    if (request.parsedResponse && request.parsedResponse.type === 'status') {
      // If we have any players run the add player thunk
      dispatch(markAllPlayersInactive());
      for (const player of request.parsedResponse.data.playersArray) {
        dispatch(syncPlayerThunk(player));
      }
    }

    // * Intercept Whitelist
    if (request.parsedResponse && request.parsedResponse.type === 'whitelist') {
      // Clear the whitelist status for all players on the serverID
      await dispatch(clearWhitelistForServerByID(request.id));
      for (const steamid of request.parsedResponse.data) {
        dispatch(syncPlayerWhitelistThunk(steamid, request.id));
      }
    }

    // * Intercept Banlist
    if (request.parsedResponse && request.parsedResponse.type === 'banlist') {
      // Clear the whitelist status for all players on the serverID
      await dispatch(clearBanlistForServerByID(request.id));
      for (const steamid of request.parsedResponse.data) {
        dispatch(syncPlayerBanlistThunk(steamid, request.id));
      }
    }

    // * Intercept Entity Dump
    if (
      request.parsedResponse &&
      request.parsedResponse.type === 'entity dump'
    ) {
      // TODO: Intercept entity dump and add markers to map
    }

    // Dispatch our success
    dispatch(sendRCON.success(request));
    logRCONResponse(request);
    return request;
  } catch (err) {
    // Catch the err and add it to the requests history
    request.response = err.toString();
    request.completed = false;
    request.date = Date.now();
    // Dispatch our failure
    dispatch(sendRCON.failure(request));
    logRCONError(request);
    return request;
  }
};

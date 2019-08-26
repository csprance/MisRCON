import { ICommandObject, NodeMisrcon, parseResponse } from 'node-misrcon';
import { createAsyncAction } from 'typesafe-actions';

import { logRCONError, logRCONResponse } from '../../lib/logger';
import {
  addBanlistStatusToPlayers,
  addWhitelistStatusToPlayers,
  markAllPlayersInactive,
  syncPlayerThunk
} from '../players/actions';
import { AsyncThunkResult } from '../redux-types';
import { IRCONRequest } from './types';

export const sendRCON = createAsyncAction(
  'rcon/REQUEST',
  'rcon/SUCCESS',
  'rcon/FAILED'
)<undefined, IRCONRequest, IRCONRequest>();
export const sendRCONAsyncThunk = ({
  ip,
  port,
  password,
  command,
  id
}: ICommandObject & { id: number }): AsyncThunkResult<
  IRCONRequest
> => async dispatch => {
  dispatch(sendRCON.request());
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
      dispatch(
        addWhitelistStatusToPlayers(request.parsedResponse.data, request.id)
      );
    }

    // * Intercept Banlist
    if (request.parsedResponse && request.parsedResponse.type === 'banlist') {
      dispatch(
        addBanlistStatusToPlayers(request.parsedResponse.data, request.id)
      );
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

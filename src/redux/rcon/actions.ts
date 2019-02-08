import { NodeMisrcon, parseResponse } from 'node-misrcon';
import { createAsyncAction } from 'typesafe-actions';

import { logRCONError, logRCONResponse } from '../../lib/logger';
import { addPlayerThunk, markAllPlayersInactive } from '../players/actions';
import { AsyncThunkResult } from '../redux-types';
import { IRCONRequest } from './types';

export const sendRCON = createAsyncAction(
  'rcon/REQUEST',
  'rcon/SUCCESS',
  'rcon/FAILED'
)<void, IRCONRequest, IRCONRequest>();
export const sendRCONAsyncThunk = ({
  ip,
  port,
  password,
  command
}: Pick<
  IRCONRequest,
  'ip' | 'port' | 'password' | 'command'
>): AsyncThunkResult<IRCONRequest> => async dispatch => {
  dispatch(sendRCON.request());
  // Initialize our request object and rcon api
  const rcon = new NodeMisrcon({ ip, port, password });
  const request: IRCONRequest = {
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
    // If we have any players run the add player thunk
    if (request.parsedResponse && request.parsedResponse.type === 'status') {
      request.parsedResponse.data.playersArray.forEach(async player => {
        await dispatch(markAllPlayersInactive());
        await dispatch(addPlayerThunk(player));
      });
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

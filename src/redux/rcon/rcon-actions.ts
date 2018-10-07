import { NodeMisrcon } from 'node-misrcon';
import { Dispatch } from 'redux';
import { createAsyncAction } from 'typesafe-actions';
import { IRootState } from '../index';
import { IRCONRequest } from './rcon-types';

export const sendRCON = createAsyncAction(
  'rcon/REQUEST',
  'rcon/SUCCESS',
  'rcon/FAILED'
)<void, IRCONRequest, IRCONRequest>();

export const sendRCONFlow = async (
  { ip, port, password, command }: IRCONRequest,
  dispatch: Dispatch<IRootState>
): Promise<IRCONRequest> => {
  dispatch(sendRCON.request());
  // Initialize our request object and rcon api
  const rcon = new NodeMisrcon({ ip, port, password });
  const request: IRCONRequest = {
    response: '',
    command,
    date: Date.now(),
    ip,
    port,
    password,
    completed: true
  };
  try {
    // Try to do the rcon request
    request.response = await rcon.send(command);
    request.date = Date.now();
    // Dispatch our success
    dispatch(sendRCON.success(request));
    return request;
  } catch (err) {
    // Catch the err and add it to the requests history
    request.response = err.toString();
    request.completed = false;
    request.date = Date.now();
    // Dispatch our failure
    dispatch(sendRCON.failure(request));
    return request;
  }
};

import { GetStateFunc } from '../redux-types';
import {
  activeServerCredentialsSelector,
  activeServerIDSelector
} from '../servers/selectors';
import { IRCONRequest } from './types';

export const makeRCONRequestObject = (
  ip: string,
  id: number,
  port: number,
  password: string,
  command: string
): IRCONRequest => ({
  ip,
  port,
  password,
  command,
  id,
  date: Date.now(),
  completed: false,
  response: '',
  parsedResponse: false
});

export const makeRequestObjectForActiveServer = (
  getState: GetStateFunc,
  command: string
) => ({
  ...activeServerCredentialsSelector(getState()),
  command,
  id: activeServerIDSelector(getState())
});

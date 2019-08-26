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

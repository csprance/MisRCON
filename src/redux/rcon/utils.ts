import { IRCONRequest } from './types';

export const makeRCONRequestObject = (
  ip: string,
  port: string,
  password: string,
  command: string
): IRCONRequest => ({
  ip,
  port,
  password,
  command,
  date: Date.now(),
  completed: false,
  response: ''
});

import { createAction } from 'typesafe-actions';
import { Ping } from './types';

export const addPingMetric = createAction(
  'ping/ADD_PING_METRIC',
  action => (ping: Omit<Ping, 'id'>) => action(ping)
);

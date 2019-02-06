import { createTransform } from 'redux-persist';

import { ServersState } from '../redux/servers';
import { OnTickFunctionFactory, TasksState } from '../redux/tasks';
import { decryptPassword, encryptPassword } from './crypto';

// Null out our cronjob and stringify <-> functionify onTick
export const functionTransform = createTransform<TasksState, any[]>(
  // Called before state is persisted
  (inboundState: TasksState) => {
    return inboundState.map(task => ({
      ...task,
      job: null,
      onTick: task.onTick.toString()
    }));
  },
  // Called before state is rehydrated
  outboundState => {
    return outboundState.map((task: any) => ({
      ...task,
      job: null,
      onTick: eval(task.onTick) as OnTickFunctionFactory // tslint:disable-line
    }));
  },
  // What reducer to run this transform on
  { whitelist: ['tasks'] }
);

// encrypt/decrypt our server passwords
export const passwordTransform = createTransform<ServersState, any[]>(
  // Called before state is persisted
  inboundState =>
    inboundState.map(server => ({
      ...server,
      password: encryptPassword(server.password)
    })),
  // Called before state is rehydrated
  outboundState =>
    outboundState.map(server => ({
      ...server,
      password: decryptPassword(server.password)
    })),
  // What reducer to run this transform on
  { whitelist: ['servers'] }
);

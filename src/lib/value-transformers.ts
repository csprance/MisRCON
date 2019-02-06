import { createTransform } from 'redux-persist';

import { ServersState } from '../redux/servers';
import { TasksState } from '../redux/tasks';
import { decryptPassword, encryptPassword } from './crypto';

// Null out our cronjob and stringify <-> functionify or onTick
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
    // TODO: How can I pass Dispatch and GetState and the Task to my onTick?
    // TODO: I need to probably handle this by dispatching a hydrate tasks thunk that can do this?
    return outboundState.map((task: any) => ({
      ...task,
      job: null,
      onTick: eval(task.onTick)
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

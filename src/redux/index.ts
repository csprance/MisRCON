import { combineReducers } from 'redux';

import app from './app';
import hosting from './hosting';
import misMap from './mismap';
import notifications from './notifications';
import ping from './ping';
import players from './players';
import rcon from './rcon';
import selfHosted from './selfHosted';
import servers from './servers';
import tasks from './tasks';
import terminal from './terminal';

export const rootReducer = combineReducers({
  app,
  hosting,
  misMap,
  notifications,
  players,
  ping,
  rcon,
  servers,
  selfHosted,
  tasks,
  terminal
});

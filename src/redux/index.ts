import { combineReducers } from 'redux';

import app from './app';
import misMap from './mismap';
import players from './players';
import rcon from './rcon';
import selfHosted from './selfHosted';
import servers from './servers';
import tasks from './tasks';
import terminal from './terminal';

export const rootReducer = combineReducers({
    app,
    players,
    rcon,
    servers,
    selfHosted,
    tasks,
    terminal,
    misMap
  });

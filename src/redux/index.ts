import { combineReducers } from 'redux';

import { misMapReducer as misMap } from './mismap';
import { playersReducer as players } from './players';
import { rconReducer as rcon } from './rcon';
import { selfHostedReducer as selfHosted } from './selfHosted';
import { serversReducer as servers } from './servers';
import { tasksReducer as tasks } from './tasks';

export const rootReducer = combineReducers({
  players,
  rcon,
  servers,
  selfHosted,
  tasks,
  misMap
});

import { combineReducers } from 'redux';
// Reducers
import { misMapReducer as misMap } from './mismap';
import { playersReducer as players } from './players';
import { rconReducer as rcon } from './rcon';
import { serversReducer as servers } from './servers';
import { tasksReducer as tasks } from './tasks';

// Types

export const rootReducer = combineReducers({
  players,
  rcon,
  servers,
  tasks,
  misMap
});

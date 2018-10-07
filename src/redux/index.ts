import { combineReducers } from 'redux';

// Reducers
import { reducer as players } from './players';
import { reducer as rcon } from './rcon';
import { reducer as servers } from './servers';
import { reducer as tasks } from './tasks';

// Types
import { PlayersState } from './players/players-types';
import { RCONState } from './rcon/rcon-types';
import { ServersState } from './servers/servers-types';
import {TasksState} from './tasks/tasks-types';

export const rootReducer = combineReducers<IRootState>({
  players,
  rcon,
  servers,
  tasks
});

export interface IRootState {
  players: PlayersState;
  rcon: RCONState;
  servers: ServersState;
  tasks: TasksState;
}

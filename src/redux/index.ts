import { combineReducers } from 'redux';
// import { reducer as rcon, RconState } from './rcon';
// import { reducer as players, PlayersState } from './players';
import { reducer as servers, ServersState } from './servers';
// import { reducer as tasks, TasksState } from './tasks';

export const rootReducer = combineReducers<IRootState>({
  // players,
  // rcon,
  servers,
  // tasks
});

export interface IRootState {
  // players: PlayersState;
  // rcon: RconState;
  servers: ServersState;
  // tasks: TasksState;
}

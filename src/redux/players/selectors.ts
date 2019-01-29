import { createSelector } from 'reselect';

import Player from '../../db/entities/Player';
import { RootState } from '../redux-types';
import { activeServerSelector } from '../servers/selectors';

export const playersSelector = (state: RootState, _props?: any) =>
  state.players;

export const activePlayersSelector = createSelector(
  playersSelector,
  players => players.filter(player => player.active)
);

export const inActivePlayersSelector = createSelector(
  playersSelector,
  players => players.filter(player => !player.active)
);

export const activePlayersOnActiveServerSelector = createSelector(
  activePlayersSelector,
  activeServerSelector,
  (activePlayers, activeServer) =>
    activePlayers.filter(player => player.serverID === activeServer.id)
);

export const inactivePlayersOnActiveServerSelector = createSelector(
  inActivePlayersSelector,
  activeServerSelector,
  (inactivePlayers, activeServer) =>
    inactivePlayers
      .filter(player => player.serverID === activeServer.id)
      .filter(player => player.steam !== '0')
);

/*
Finds a player by a partial
 */
export const makePlayerByPartialSelector = (partial: Partial<Player>) =>
  createSelector(
    playersSelector,
    players => {
      const [key] = Object.keys(partial);
      const value = partial[key];
      return players.find(player => player[key] === value);
    }
  );

import { createSelector } from 'reselect';

import { RootState } from '../redux-types';
import {
  activeServerIDSelector,
  activeServerSelector
} from '../servers/selectors';
import { Player, PlayersState } from './types';

export const playersSelector = (state: RootState, _props?: any): PlayersState =>
  state.players;

export const idSelect = (_: RootState, id: number) => id;

export const partialSelector = (_: RootState, partial: Partial<Player>) =>
  partial;

export const activePlayersSelector = createSelector(
  playersSelector,
  players => players.filter(player => player.active)
);

export const whitelistedPlayersSelector = createSelector(
  playersSelector,
  players => players.filter(player => player.whitelisted.length)
);

export const bannedPlayersSelector = createSelector(
  playersSelector,
  players => players.filter(player => player.banned.length)
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

export const allPlayersOnActiveServerSelector = createSelector(
  activePlayersOnActiveServerSelector,
  inactivePlayersOnActiveServerSelector,
  (active, inactive) => [...active, ...inactive]
);

export const bannedPlayersOnActiveServer = createSelector(
  bannedPlayersSelector,
  activeServerIDSelector,
  (players, activeServerID) =>
    players.filter(player => player.banned.includes(activeServerID))
);

export const whitelistedPlayersOnActiveServer = createSelector(
  whitelistedPlayersSelector,
  activeServerIDSelector,
  (players, activeServerID) =>
    players.filter(player => player.whitelisted.includes(activeServerID))
);

export const playerByIDSelector = createSelector(
  playersSelector,
  (_: RootState, id: number) => id,
  (players, id) => players.filter(player => player.id === id)
);

/*
Finds a player by a partial
 */
export const playerByPartialSelector = createSelector(
  playersSelector,
  partialSelector,
  (players, partial) => {
    const [key] = Object.keys(partial);
    const value = partial[key];
    return players.find(player => player[key] === value);
  }
);

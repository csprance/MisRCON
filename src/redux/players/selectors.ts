import { createSelector } from 'reselect';

import { RootState } from '../redux-types';
import { activeServerSelector } from '../servers/selectors';

export const playersSelector = (state: RootState, _props: any) => state.players;

export const playersOnActiveServerSelector = createSelector(
  playersSelector,
  activeServerSelector,
  (players, activeServer) =>
    players.filter(player => player.serverID === activeServer.id)
);

import { createSelector } from 'reselect';

import { RootState } from '../redux-types';
import { steamIDPropsSelector } from '../selectors';

export const pingSelector = (state: RootState, _props?: any) => state.ping;

export const pingByPlayerSelector = createSelector(
  pingSelector,
  steamIDPropsSelector,
  (ping, id) => ping.filter(p => p.playerID === id)
);

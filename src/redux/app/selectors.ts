import { createSelector } from 'reselect';

import { RootState } from '../redux-types';

export const appStateSelector = (state: RootState, _props?: any) => state.app;

export const playerProfileDialogSelector = createSelector(
  appStateSelector,
  app => app.playerProfileDialog
);

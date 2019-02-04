import { createSelector } from 'reselect';

import { RootState } from '../redux-types';

export const appStateSelector = (state: RootState, _props?: any) => state.app;

export const playerProfileDialogSelector = createSelector(
  appStateSelector,
  app => app.playerProfileDialogOpen
);
export const playerListShowingSelector = createSelector(
  appStateSelector,
  app => app.playerSideBarOpen
);

export const addServerDialogShowingSelector = createSelector(
  appStateSelector,
  app => app.addServerDialogOpen
);

export const serverHelpMarkdownSelector = createSelector(
  appStateSelector,
  app => app.serverHelpMarkdown
);

export const selectedPlayerIDSelector = createSelector(
  appStateSelector,
  app => app.selectedPlayerID
);

export const settingsDialogShowingSelector = createSelector(
  appStateSelector,
  app => app.settingsDialogOpen
);
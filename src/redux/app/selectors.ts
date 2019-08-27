import { createSelector } from 'reselect';

import { RootState } from '../redux-types';

export const appStateSelector = (state: RootState, _props?: any) => state.app;

export const playerSidebarOpenSelector = createSelector(
  appStateSelector,
  app => app.playerSideBarOpen
);

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
export const addTaskDialogShowingSelector = createSelector(
  appStateSelector,
  app => app.addTaskDialogOpen
);

export const updateServerDialogShowingSelector = createSelector(
  appStateSelector,
  app => app.updateServerDialogOpen
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

export const addBanDialogShowingSelector = createSelector(
  appStateSelector,
  app => app.addBanDialogOpen
);

export const addWhitelistDialogShowingSelector = createSelector(
  appStateSelector,
  app => app.addWhitelistDialogOpen
);

export const terminalThemeSelector = createSelector(
  appStateSelector,
  app => app.terminalTheme
);

export const updateNeededSelector = createSelector(
  appStateSelector,
  app => app.updateNeeded
);

export const firstRunSelector = createSelector(
  appStateSelector,
  app => app.firstRun
);

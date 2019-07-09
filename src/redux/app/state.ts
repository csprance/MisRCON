import { AppState, DialogState } from './types';

export const defaultDialogState: DialogState = {
  playerProfileDialogOpen: false,
  addTaskDialogOpen: false,
  settingsDialogOpen: false,
  addServerDialogOpen: false,
  updateServerDialogOpen: false,
  addBanDialogOpen: false,
  addWhitelistDialogOpen: false
};

export const defaultState: AppState = {
  selectedPlayerID: '',
  playerSideBarOpen: true,
  serverHelpMarkdown: 'string',
  terminalTheme: 'default',
  ...defaultDialogState
};

export default defaultState;

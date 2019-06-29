import { AppState } from './types';

export const defaultState: AppState = {
  settingsDialogOpen: false,
  playerProfileDialogOpen: false,
  selectedPlayerID: '',
  playerSideBarOpen: true,
  addServerDialogOpen: false,
  addTaskDialogOpen: false,
  updateServerDialogOpen: false,
  serverHelpMarkdown: 'string'
};

export default defaultState;

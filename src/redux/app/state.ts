import { AppState } from './types';

export const defaultState: AppState = {
  settingsDialogOpen: false,
  playerProfileDialogOpen: false,
  selectedPlayerID: '',
  playerSideBarOpen: true,
  addServerDialogOpen: false,
  serverHelpMarkdown: 'string'
};

export default defaultState;

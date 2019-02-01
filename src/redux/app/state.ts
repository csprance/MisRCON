import { AppState } from './types';

export const defaultState: AppState = {
  playerProfileDialog: false,
  selectedPlayerID: '',
  playerListOpen: false,
  addServerDialogOpen: false,
  serverHelpMarkdown: 'string',
};

export default defaultState;

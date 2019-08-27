import { CRYPTO_SALT } from '../../constants/env';
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
  updateNeeded: false,
  cryptoSalt: CRYPTO_SALT,
  selectedPlayerID: '',
  playerSideBarOpen: true,
  serverHelpMarkdown: 'string',
  terminalTheme: 'default',
  firstRun: true,
  ...defaultDialogState
};

export default defaultState;

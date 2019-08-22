import * as npmPackage from '../../../package.json';
import { AppState, DialogState } from './types';


export const defaultDialogState: DialogState = {
  playerProfileDialogOpen: false,
  addTaskDialogOpen: false,
  settingsDialogOpen: false,
  addServerDialogOpen: true,
  updateServerDialogOpen: false,
  addBanDialogOpen: false,
  addWhitelistDialogOpen: false
};

export const defaultState: AppState = {
  localVersion: npmPackage.version,
  remoteVersion: npmPackage.version,
  selectedPlayerID: '',
  playerSideBarOpen: true,
  serverHelpMarkdown: 'string',
  terminalTheme: 'default',
  ...defaultDialogState
};

export default defaultState;

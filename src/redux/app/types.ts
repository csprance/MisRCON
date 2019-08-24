import { SteamID } from 'node-misrcon';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

// These indicate whether or not we are showing or hiding a dialog window
export interface DialogState {
  // /////////////
  // Dialogs
  // /////////////
  playerProfileDialogOpen: boolean;
  addTaskDialogOpen: boolean;
  settingsDialogOpen: boolean;
  addServerDialogOpen: boolean;
  updateServerDialogOpen: boolean;
  addBanDialogOpen: boolean;
  addWhitelistDialogOpen: boolean;
}

export interface AppState extends DialogState {
  // /////////////
  // Others
  // /////////////
  // Our application version from package.json
  localVersion: string;
  // Current remote version
  remoteVersion: string;
  // The Help markdown from github
  serverHelpMarkdown: string;
  // What player By ID should be displayed in the PlayerProfile Dialog
  selectedPlayerID: SteamID;
  // Is the player sidebar open that shows all the players on the current server
  playerSideBarOpen: boolean;
  // The theme of the terminal
  terminalTheme: string;
  // The salt value used in storing the passwords
  cryptoSalt: string;
  //
  firstRun: boolean;
}

export type AppActions = ActionType<typeof actions>;

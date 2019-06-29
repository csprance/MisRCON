import { SteamID } from 'node-misrcon';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

// These indicate whether or not we are showing or hiding a dialog window
export type AppState = {
  // /////////////
  // Dialogs
  // /////////////

  playerProfileDialogOpen: boolean;
  addTaskDialogOpen: boolean;
  settingsDialogOpen: boolean;
  addServerDialogOpen: boolean;
  updateServerDialogOpen: boolean;

  // /////////////
  // Others
  // /////////////

  // The Help markdown from github
  serverHelpMarkdown: string;
  // What player By ID should be displayed in the PlayerProfile Dialog
  selectedPlayerID: SteamID;
  playerSideBarOpen: boolean;
};
export type AppActions = ActionType<typeof actions>;

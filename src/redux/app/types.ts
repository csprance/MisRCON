import { SteamID } from 'node-misrcon';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

// These indicate whether or not we are showing or hiding a dialog window
export type AppState = {
  // /////////////
  // Dialogs
  // /////////////

  // Is the PlayerProfile Dialog open
  playerProfileDialogOpen: boolean;
  // Is the Server Settings Dialog open
  settingsDialogOpen: boolean;
  // Add Server Dialog Showing
  addServerDialogOpen: boolean;

  // /////////////
  // Others
  // /////////////

  // The Help markdown from github
  serverHelpMarkdown: string;
  // What player By ID should be displayed in the PlayerProfile Dialog
  selectedPlayerID: SteamID;
  // The player sidebar
  playerSideBarOpen: boolean;
};
export type AppActions = ActionType<typeof actions>;

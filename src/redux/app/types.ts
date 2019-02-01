import { SteamID } from 'node-misrcon';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

// These indicate whether or not we are showing or hiding a dialog window
export type AppState = {
  // Is the PlayerProfile Dialog open
  playerProfileDialog: boolean;
  // What player By ID should be displayed in the PlayerProfile Dialog
  selectedPlayerID: SteamID;
  playerListOpen: boolean;
  addServerDialogOpen: boolean;
  // The Help markdown from github
  serverHelpMarkdown: string;
};
export type AppActions = ActionType<typeof actions>;

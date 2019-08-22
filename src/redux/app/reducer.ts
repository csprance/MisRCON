import { getType } from 'typesafe-actions';
import * as actions from './actions';
import defaultState, { defaultDialogState } from './state';
import { AppActions, AppState } from './types';

export default (
  state: AppState = defaultState,
  action: AppActions
): AppState => {
  switch (action.type) {
    // //////////////
    // Dialogs
    // //////////////

    // Player profile Dialog
    case getType(actions.togglePlayerProfileDialog):
      return {
        ...state,
        ...defaultDialogState,
        playerProfileDialogOpen: !state.playerProfileDialogOpen
      };

    // Add Task Dialog
    case getType(actions.toggleAddTaskDialog):
      return {
        ...state,
        ...defaultDialogState,
        addTaskDialogOpen: !state.addTaskDialogOpen
      };

    // Settings Dialog
    case getType(actions.toggleSettingsDialog):
      return {
        ...state,
        ...defaultDialogState,
        settingsDialogOpen: !state.settingsDialogOpen
      };

    // Update Server Dialog
    case getType(actions.toggleUpdateServerDialog):
      return {
        ...state,
        ...defaultDialogState,
        updateServerDialogOpen: !state.updateServerDialogOpen
      };

    // Add Server Dialog
    case getType(actions.toggleAddServerDialog):
      return {
        ...state,
        ...defaultDialogState,
        addServerDialogOpen: !state.addServerDialogOpen
      };

    // Player Profile
    case getType(actions.hidePlayerProfileDialog):
      return {
        ...state,
        ...defaultDialogState,
        playerProfileDialogOpen: false
      };

    // Ban List
    case getType(actions.toggleAddWhitelistDialog):
      return {
        ...state,
        ...defaultDialogState,
        addWhitelistDialogOpen: !state.addWhitelistDialogOpen
      };

    case getType(actions.toggleAddBanDialog):
      return {
        ...state,
        ...defaultDialogState,
        addBanDialogOpen: !state.addBanDialogOpen
      };

    case getType(actions.closeAllDialogs):
      return {
        ...state,
        ...defaultDialogState
      };

    // //////////////
    // Others
    // //////////////

    case getType(actions.togglePlayerList):
      return { ...state, playerSideBarOpen: !state.playerSideBarOpen };

    case getType(actions.setPlayerActiveInPlayerProfile):
      return { ...state, selectedPlayerID: action.payload };

    case getType(actions.fetchServerHelpMarkdown.success):
      return { ...state, serverHelpMarkdown: action.payload };

    case getType(actions.checkForUpdates.success):
      return { ...state, remoteVersion: action.payload };

    case getType(actions.setTerminalTheme):
      return { ...state, terminalTheme: action.payload };

    default:
      return state;
  }
};

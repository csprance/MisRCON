import { getType } from 'typesafe-actions';
import * as actions from './actions';
import defaultState from './state';
import { AppActions, AppState } from './types';

export default (
  state: AppState = defaultState,
  action: AppActions
): AppState => {
  switch (action.type) {
    case getType(actions.togglePlayerList):
      return { ...state, playerSideBarOpen: !state.playerSideBarOpen };

    case getType(actions.toggleUpdateServerDialog):
      return { ...state, updateServerDialogOpen: !state.updateServerDialogOpen };

    case getType(actions.toggleAddServerDialog):
      return { ...state, addServerDialogOpen: !state.addServerDialogOpen };

    case getType(actions.toggleAddTaskDialog):
      return { ...state, addTaskDialogOpen: !state.addTaskDialogOpen };

    case getType(actions.toggleSettingsDialog):
      return {
        ...state,
        settingsDialogOpen: !state.settingsDialogOpen
      };

    case getType(actions.togglePlayerProfileDialog):
      return {
        ...state,
        playerProfileDialogOpen: !state.playerProfileDialogOpen
      };

    case getType(actions.setPlayerActiveInPlayerProfile):
      return { ...state, selectedPlayerID: action.payload };

    case getType(actions.fetchServerHelpMarkdown.success):
      return { ...state, serverHelpMarkdown: action.payload };

    case getType(actions.hidePlayerProfileDialog):
      return { ...state, playerProfileDialogOpen: false };
    default:
      return state;
  }
};

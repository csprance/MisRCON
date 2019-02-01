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
      return { ...state, playerListOpen: !state.playerListOpen };
    case getType(actions.toggleAddServerDialog):
      return { ...state, addServerDialogOpen: !state.addServerDialogOpen };
    case getType(actions.togglePlayerProfileDialog):
      return { ...state, playerProfileDialog: !state.playerProfileDialog };
    case getType(actions.setPlayerActiveInPlayerProfile):
      return { ...state, selectedPlayerID: action.payload };
      case getType(actions.fetchServerHelpMarkdown.success):
      return { ...state, serverHelpMarkdown: action.payload };
    default:
      return state;
  }
};

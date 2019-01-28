import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

// These indicate whether or not we are showing or hiding a dialog window
export type AppState = {
  playerProfileDialog: boolean;
};
export type AppActions = ActionType<typeof actions>;

import { getType } from 'typesafe-actions';
import * as actions from './actions';
import defaultState from './state';
import { AppActions, AppState } from './types';

export default (
  state: AppState = defaultState,
  action: AppActions
): AppState => {
  switch (action.type) {
    case getType(actions.togglePlayerProfileDialog):
      return {...state, playerProfile: true};
    default:
      return state;
  }
};

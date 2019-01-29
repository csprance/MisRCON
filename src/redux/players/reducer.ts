import { ActionType, getType } from 'typesafe-actions';
import * as playersActions from './actions';
import { default as defaultState } from './state';
import { PlayersState } from './types';

export type PlayersActions = ActionType<typeof playersActions>;

export default (
  state: PlayersState = defaultState,
  action: PlayersActions
): PlayersState => {
  switch (action.type) {
    case getType(playersActions.hydratePlayers.success):
      return [...action.payload];

    case getType(playersActions.hydratePlayers.failure):
      return [...action.payload];
    default:
      return state;
  }
};

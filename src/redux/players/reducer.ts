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

    // Update Player with any number of keys/values
    case getType(playersActions.updatePlayer):
      // Find the player from state
      const player = state.find(
        _player => _player.steam === action.payload.steam
      );
      // If player exists
      return player
        ? [
            // filter the player out from the state
            ...state.filter(_player => _player.steam === action.payload.steam),
            // update player add it to the state other wise return the state
            { ...player, ...action.payload.args }
          ]
        : // return the state player not found
          state;
    default:
      return state;
  }
};

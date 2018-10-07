import { ActionType, getType } from 'typesafe-actions';
import * as playersActions from './players-actions';
import { default as defaultState } from './players-state';
import { PlayersState } from './players-types';

export type PlayersActions = ActionType<typeof playersActions>;

export const reducer = (
  state: PlayersState = defaultState,
  action: PlayersActions
): PlayersState => {
  switch (action.type) {
    // addPlayerFlow
    case getType(playersActions.addPlayer.request):
      return state;
    case getType(playersActions.addPlayer.success):
      return state;
    case getType(playersActions.addPlayer.failure):
      return state;
    // Update Player with any number of keys/values
    case getType(playersActions.updatePlayer):
      // Find the player from state
      const player = state.find(
        _player => _player.steam === action.payload.steamid
      );
      // If player exists
      return player
        ? [
            // filter the player out from the state
            ...state.filter(
              _player => _player.steam === action.payload.steamid
            ),
            // update player add it to the state other wise return the state
            { ...player, ...action.payload.args }
          ]
        : // return the state player not found
          state;
    default:
      return state;
  }
};

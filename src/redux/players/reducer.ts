import * as _ from 'lodash';
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
    // Set all player to not active
    case getType(playersActions.getPlayersViaRCON.request):
      return state.map(player => ({ ...player, active: false }));

    // Update all the players with new data
    case getType(playersActions.getPlayersViaRCON.success):
      return _.uniqBy([...action.payload, ...state], 'steam');

    case getType(playersActions.banPlayer.success):
      return state;

    case getType(playersActions.kickPlayer.success):
      return state;

    case getType(playersActions.setPlayerNote):
      const { steam, notes } = action.payload;
      return state.map(player => ({
        ...player,
        notes: player.steam === steam ? notes : player.notes
      }));

    default:
      return state;
  }
};

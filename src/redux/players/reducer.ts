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
    case getType(playersActions.deleteAllPlayers):
      return [];

    // TODO: Add Request ID to whitelist, remove duplicates
    case getType(playersActions.addWhitelistStatusToPlayers):
      // const { steamids, serverId } = action.payload;
      return state.map(player => ({
        ...player,
        whitelisted: [...player.whitelisted]
      }));

    // TODO: Add Request ID to banlist, remove duplicates
    case getType(playersActions.addBanlistStatusToPlayers):
      // const { steamids, serverId } = action.payload;
      return state.map(player => ({ ...player, banned: [...player.banned] }));

    case getType(playersActions.markAllPlayersInactive):
      return state.map(player => ({ ...player, active: false }));

    case getType(playersActions.syncPlayer.success):
      return [
        ...state.filter(player => player.steam !== action.payload.steam),
        action.payload
      ];

    case getType(playersActions.banPlayer.success):
      return state.map(player => ({
        ...player,
        banned: [...player.banned, action.payload]
      }));

    case getType(playersActions.kickPlayer.success):
      return state;

    case getType(playersActions.setPlayerNote):
      return state.map(player => ({
        ...player,
        notes:
          player.steam === action.payload.steam
            ? action.payload.notes
            : player.notes
      }));

    case getType(playersActions.setPlayerColor):
      return state.map(player => ({
        ...player,
        color:
          player.steam === action.payload.steam
            ? action.payload.color
            : player.color
      }));

    default:
      return state;
  }
};

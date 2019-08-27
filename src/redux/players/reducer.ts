import { ActionType, createReducer } from 'typesafe-actions';
import * as playersActions from './actions';
import { default as defaultState } from './state';

export type PlayersActions = ActionType<typeof playersActions>;

export default createReducer(defaultState)
  .handleAction(playersActions.deleteAllPlayers, () => [])

  // TODO: Add Request ID to whitelist, remove duplicates
  .handleAction(playersActions.addWhitelistStatusToPlayers, state =>
    state.map(player => ({
      ...player,
      whitelisted: [...player.whitelisted]
    }))
  )

  // TODO: Add Request ID to banlist, remove duplicates
  .handleAction(playersActions.addBanlistStatusToPlayers, state =>
    // const { steamids, serverId } = action.payload;
    state.map(player => ({ ...player, banned: [...player.banned] }))
  )

  .handleAction(playersActions.markAllPlayersInactive, state =>
    state.map(player => ({ ...player, active: false }))
  )

  .handleAction(playersActions.syncPlayer.success, (state, action) => [
    ...state.filter(player => player.steam !== action.payload.steam),
    action.payload
  ])

  .handleAction(playersActions.banPlayer.success, (state, action) =>
    state.map(player => ({
      ...player,
      banned: [...player.banned, action.payload]
    }))
  )

  .handleAction(playersActions.kickPlayer.success, state => state)

  .handleAction(playersActions.setPlayerNote, (state, action) =>
    state.map(player => ({
      ...player,
      notes:
        player.steam === action.payload.steam
          ? action.payload.notes
          : player.notes
    }))
  )

  .handleAction(playersActions.setPlayerColor, (state, action) =>
    state.map(player => ({
      ...player,
      color:
        player.steam === action.payload.steam
          ? action.payload.color
          : player.color
    }))
  );

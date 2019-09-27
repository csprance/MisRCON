import { ActionType, createReducer } from 'typesafe-actions';
import * as playersActions from './actions';
import { default as defaultState } from './state';

export type PlayersActions = ActionType<typeof playersActions>;

export default createReducer(defaultState)
  .handleAction(playersActions.deleteAllPlayers, () => [])

  .handleAction(playersActions.clearWhitelistForServerByID, (state, action) =>
    state.map(player => ({
      ...player,
      whitelisted: player.whitelisted.filter(w => w !== action.payload.serverId)
    }))
  )

  .handleAction(playersActions.clearBanlistForServerByID, (state, action) =>
    state.map(player => ({
      ...player,
      banned: player.banned.filter(b => b !== action.payload.serverId)
    }))
  )

  .handleAction(playersActions.addWhitelistStatusToPlayers, (state, action) =>
    state.map(player => ({
      ...player,
      // If steamids contain the current player steam then add the serverid to it
      whitelisted: action.payload.steamids.includes(player.steam)
        ? [
            ...player.whitelisted.filter(x => x !== action.payload.serverId),
            action.payload.serverId
          ]
        : player.whitelisted
    }))
  )

  .handleAction(playersActions.addBanlistStatusToPlayers, (state, action) =>
    // const { steamids, serverId } = action.payload;
    state.map(player => ({
      ...player,
      // If steamids contain the current player steam then add the serverid to it
      banned: action.payload.steamids.includes(player.steam)
        ? [
            ...player.banned.filter(x => x !== action.payload.serverId),
            action.payload.serverId
          ]
        : player.banned
    }))
  )

  .handleAction(playersActions.markAllPlayersInactive, state =>
    state.map(player => ({ ...player, active: false }))
  )

  .handleAction(playersActions.syncPlayer.success, (state, action) => [
    ...state.filter(player => player.steam !== action.payload.steam),
    action.payload
  ])

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

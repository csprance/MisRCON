import { IPlayer, NodeMisrcon } from 'node-misrcon';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { AsyncThunkResult } from '../redux-types';
import {
  activeServerCredentialsSelector,
  activeServerSelector
} from '../servers/selectors';
import { playersSelector } from './selectors';
import { Player } from './types';
import { getSteamAvatar } from './utils';

/*
 * Gets the players using rcon
 * Gets the steam avatar if needed
 * Adds the new players to the state
 */
export const getPlayersViaRCON = createAsyncAction(
  'players/GET_VIA_RCON_REQUEST',
  'players/GET_VIA_RCON_SUCCESS',
  'players/GET_VIA_RCON_FAILED'
)<void, void, string>();
export const getPlayersViaRCONThunk = (): AsyncThunkResult<any> => async (
  dispatch,
  getState
) => {
  dispatch(getPlayersViaRCON.request());
  try {
    await dispatch(markAllPlayersInactive());
    const activeServerCredentials = activeServerCredentialsSelector(getState());
    const { playersArray } = await new NodeMisrcon({
      ...activeServerCredentials
    }).getStatus();
    playersArray.forEach(async player => {
      await dispatch(addPlayerThunk(player));
    });
    dispatch(getPlayersViaRCON.success());
  } catch (err) {
    dispatch(getPlayersViaRCON.failure(err.toString()));
  }
};

export const addPlayer = createAsyncAction(
  'players/ADD_PLAYER_REQUEST',
  'players/ADD_PLAYER_SUCCESS',
  'players/ADD_PLAYER_FAILED'
)<void, Player, string>();
export const addPlayerThunk = (
  player: IPlayer
): AsyncThunkResult<void> => async (dispatch, getState) => {
  dispatch(addPlayer.request());
  try {
    const storePlayers: Player[] = playersSelector(getState());
    const activeServerID = activeServerSelector(getState()).id;
    const storedPlayer = storePlayers.find(pl => pl.steam === player.steam);
    // If the player is stored update it's data
    if (storedPlayer) {
      const pl: Player = { ...storedPlayer, ...player, active: true };
      dispatch(addPlayer.success(pl));
      return;
    }
    // If the player is not stored create new data
    const syncedPlayer: Player = await {
      ...player,
      avatarUrl: await getSteamAvatar(player.steam),
      active: true,
      serverID: activeServerID,
      color: '#fff',
      notes: '',
      banned: [],
      whitelisted: [],
      seenOn: []
    };
    dispatch(addPlayer.success(syncedPlayer));
    return;
  } catch (err) {
    dispatch(addPlayer.failure(err.toString()));
  }
};

/*
Given some parameters about a player add them to the state
 */
export const banPlayer = createAsyncAction(
  'players/BAN_REQUEST',
  'players/BAN_SUCCESS',
  'players/BAN_FAILED'
)<void, Player, string>();
export const banPlayerThunk = (
  player: Player
): AsyncThunkResult<any> => async dispatch => {
  // Tell Redux we're requesting data from the db
  dispatch(banPlayer.request());
  try {
    dispatch(banPlayer.success(player));
  } catch (err) {
    dispatch(banPlayer.failure(err.toString()));
  }
};

/*
Kick a player
 */
export const kickPlayer = createAsyncAction(
  'players/KICK_REQUEST',
  'players/KICK_SUCCESS',
  'players/KICK_FAILED'
)<void, Player, string>();
export const kickPlayerThunk = (
  player: Player
): AsyncThunkResult<any> => async dispatch => {
  // Tell Redux were requesting data from the db
  dispatch(kickPlayer.request());
  try {
    dispatch(kickPlayer.success(player));
  } catch (err) {
    dispatch(kickPlayer.failure(err.toString()));
  }
};

export const setPlayerNote = createAction(
  'players/SET_NOTE',
  resolve => (steam: string, notes: string) => resolve({ steam, notes })
);

export const setPlayerColor = createAction(
  'players/SET_COLOR',
  resolve => (steam: string, color: string) => resolve({ steam, color })
);

export const markAllPlayersInactive = createAction(
  'players/MARK_ALL_PLAYERS_INACTIVE'
);

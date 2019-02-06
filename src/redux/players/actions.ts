import { NodeMisrcon } from 'node-misrcon';
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
)<void, Player[], string>();
export const getPlayersViaRCONThunk = (): AsyncThunkResult<any> => async (
  dispatch,
  getState
) => {
  // Mark all players inactive
  dispatch(getPlayersViaRCON.request());
  try {
    const activeServerID = activeServerSelector(getState()).id;
    const activeServerCredentials = activeServerCredentialsSelector(getState());
    const { playersArray } = await new NodeMisrcon({
      ...activeServerCredentials
    }).getStatus();
    // If the player has an avatar in store grab that
    const storePlayers: Player[] = playersSelector(getState());
    const syncedPlayers: Player[] = await Promise.all([
      ...playersArray.map(async newPlayer => {
        const storedPlayer = storePlayers.find(
          pl => pl.steam === newPlayer.steam
        );
        // If the player is stored update it's data
        if (storedPlayer) {
          const pl: Player = { ...storedPlayer, ...newPlayer };
          return pl;
        }
        // If the player is not stored create new data
        const player: Player = {
          ...newPlayer,
          avatarUrl: await getSteamAvatar(newPlayer.steam),
          active: true,
          serverID: activeServerID,
          color: '#fff',
          notes: '',
          banned: [],
          whitelisted: [],
          seenOn: []
        };
        return player;
      })
    ]);

    dispatch(getPlayersViaRCON.success(syncedPlayers));
  } catch (err) {
    dispatch(getPlayersViaRCON.failure(err.toString()));
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
  // Tell Redux were requesting data from the db
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
  'player/SET_NOTE',
  resolve => (steam: string, notes: string) => resolve({ steam, notes })
);

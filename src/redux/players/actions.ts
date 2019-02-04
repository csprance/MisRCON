import * as _ from 'lodash';
import { NodeMisrcon } from 'node-misrcon';
import { getConnection } from 'typeorm';
import { createAsyncAction } from 'typesafe-actions';

import Player from '../../db/entities/Player';
import { AsyncThunkResult } from '../redux-types';
import {
  activeServerCredentialsSelector,
  activeServerSelector
} from '../servers/selectors';
import { markAllPlayerNotActiveAndReturn, synchronizePlayer } from './utils';

/*
Gets the players using rcon
 */
export const hydratePlayers = createAsyncAction(
  'players/HYDRATE_REQUEST',
  'players/HYDRATE_SUCCESS',
  'players/HYDRATE_FAILED'
)<void, Player[], string>();
export const hydratePlayersThunk = (): AsyncThunkResult<any> => async (
  dispatch,
  getState
) => {
  dispatch(hydratePlayers.request());
  try {
    const players = await markAllPlayerNotActiveAndReturn();
    const activeServerId = activeServerSelector(getState()).id;
    const activeServerCredentials = activeServerCredentialsSelector(getState());

    const { playersArray } = await new NodeMisrcon({
      ...activeServerCredentials
    }).getStatus();
    const synchronizedPlayers = await Promise.all([
      ...playersArray.map(async player =>
        synchronizePlayer(player, activeServerId)
      ),
      ...players
    ]);

    dispatch(
      hydratePlayers.success(_.uniqBy([...synchronizedPlayers], 'steam'))
    );
  } catch (err) {
    dispatch(hydratePlayers.failure(err.toString()));
  }
};

/*
Given some parameters about a player add them to the state
 */
export const addPlayer = createAsyncAction(
  'players/ADD_REQUEST',
  'players/ADD_SUCCESS',
  'players/ADD_FAILED'
)<void, Player, string>();
export const addPlayerThunk = (
  player: Player
): AsyncThunkResult<any> => async dispatch => {
  // Tell Redux were requesting data from the db
  dispatch(addPlayer.request());
  try {
    dispatch(addPlayer.success(player));
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

export const setPlayerNote = createAsyncAction(
  'players/SET_PLAYER_NOTE_REQUEST',
  'players/SET_PLAYER_NOTE_SUCCESS',
  'players/SET_PLAYER_NOTE_FAILED'
)<void, void, string>();
export const setPlayerNoteThunk = (
  notes: string,
  steam: string
): AsyncThunkResult<any> => async dispatch => {
  dispatch(setPlayerNote.request());
  try {
    const playersRepo = await getConnection().getRepository(Player);
    const player = await playersRepo.findOneOrFail({ steam });
    playersRepo.save({ ...player, notes });
    await dispatch(hydratePlayersThunk());
    dispatch(setPlayerNote.success());
  } catch (err) {
    dispatch(setPlayerNote.failure(err.toString()));
  }
};

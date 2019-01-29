import * as _ from 'lodash';
import { NodeMisrcon } from 'node-misrcon';
import { Dispatch } from 'redux';
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
)<void, Player[], Player[]>();
export const hydratePlayersThunk = (): AsyncThunkResult<any> => async (
  dispatch,
  getState
) => {
  dispatch(hydratePlayers.request());
  const players = await markAllPlayerNotActiveAndReturn();
  try {
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

    dispatch(hydratePlayers.success(_.uniqBy([...synchronizedPlayers], 'steam')));
  } catch (err) {
    dispatch(hydratePlayers.failure(players));
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
export const addPlayerThunk = async (
  player: Player,
  dispatch: Dispatch
): Promise<void> => {
  // Tell Redux were requesting data from the db
  dispatch(addPlayer.request());
  try {
    dispatch(addPlayer.success(player));
  } catch (err) {
    dispatch(addPlayer.failure(err.toString()));
  }
};

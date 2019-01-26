import { NodeMisrcon } from 'node-misrcon';
import { Dispatch } from 'redux';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { AsyncThunkResult } from '../redux-types';
import {
  activeServerCredentialsSelector,
  activeServerSelector
} from '../servers/selectors';
import { IPlayer } from './types';
import { synchronizePlayer } from './utils';

/*
Gets the players using rcon
 */
export const hydratePlayers = createAsyncAction(
  'players/HYDRATE_REQUEST',
  'players/HYDRATE_SUCCESS',
  'players/HYDRATE_FAILED'
)<void, IPlayer[], string>();
export const hydratePlayersThunk = (): AsyncThunkResult<any> => async (
  dispatch,
  getState
) => {
  try {
    dispatch(hydratePlayers.request());
    const { ip, password, port } = activeServerCredentialsSelector(getState());
    const rcon = new NodeMisrcon({ ip, password, port });
    const { playersArray } = await rcon.getStatus();
    const mappedPlayers = await Promise.all(
      playersArray.map(async player =>
        synchronizePlayer(player, activeServerSelector(getState()).id)
      )
    );

    dispatch(hydratePlayers.success(mappedPlayers));
  } catch (err) {
    dispatch(hydratePlayers.failure(err));
  }
};

/*
Given some parameters about a player add them to the state
 */
export const addPlayer = createAsyncAction(
  'players/ADD_REQUEST',
  'players/ADD_SUCCESS',
  'players/ADD_FAILED'
)<void, IPlayer, string>();
export const addPlayerThunk = async (
  player: IPlayer,
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

export const updatePlayer = createAction(
  'players/UPDATE_PLAYER',
  resolve => (steam: number, args: Partial<IPlayer>) => resolve({ steam, args })
);

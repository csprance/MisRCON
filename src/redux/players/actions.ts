import { Dispatch } from 'redux';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { IPlayer } from './types';

/*
Given some parameters about a player add them to the state
 */
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
export const addPlayer = createAsyncAction(
  'players/ADD_PLAYER_REQUEST',
  'players/ADD_PLAYER_SUCCESS',
  'players/ADD_PLAYER_FAILED'
)<void, IPlayer, string>();

export const updatePlayer = createAction(
  'players/UPDATE_PLAYER',
  resolve => (steamid: string, args: Partial<IPlayer>) =>
    resolve({ steamid, args })
);

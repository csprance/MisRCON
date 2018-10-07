import { Dispatch } from 'redux';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { IRootState } from '../index';
import { IPlayer } from './players-types';

export const addPlayer = createAsyncAction(
  'players/ADD_PLAYER_REQUEST',
  'players/ADD_PLAYER_SUCCESS',
  'players/ADD_PLAYER_FAILED'
)<void, IPlayer, string>();

// Given some parameters about a player add them to the state
export const addPlayerFlow = async (
  player: IPlayer,
  dispatch: Dispatch<IRootState>
): Promise<void> => {
  // Tell Redux were requesting data from the db
  dispatch(addPlayer.request());
  try {
    // Do the actual request
    dispatch(addPlayer.success(player));
  } catch (err) {
    // Catch the err
    dispatch(addPlayer.failure(err.toString()));
  }
};

export const updatePlayer = createAction(
  'players/UPDATE_PLAYER',
  resolve => (steamid: string, args: Partial<IPlayer>) =>
    resolve({ steamid, args })
);

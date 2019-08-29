import { createAsyncAction } from 'typesafe-actions';
import { AsyncThunkResult } from '../redux-types';

/*
 * Gets the players using rcon
 * Sends the IPlayer to SyncPlayer thunk to be synced and added to state
 */
export const updateHosting = createAsyncAction(
  'hosting/UPDATE_REQUEST',
  'hosting/UPDATE_SUCCESS',
  'hosting/UPDATE_FAILED'
)<undefined, undefined, string>();
export const updateHostingThunk = (): AsyncThunkResult<any> => async (
  dispatch,
  _getState
) => {
  dispatch(updateHosting.request());
  try {
    dispatch(updateHosting.success());
  } catch (err) {
    dispatch(updateHosting.failure(err.toString()));
  }
};

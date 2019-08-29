import { createAsyncAction } from 'typesafe-actions';
import { AsyncThunkResult } from '../redux-types';

export const pollServerData = createAsyncAction(
  'selfHosted/POLL_REQUEST',
  'selfHosted/POLL_SUCCESS',
  'selfHosted/POLL_FAILED'
)<undefined, undefined, undefined>();
export const pollServerDataThunk = (): AsyncThunkResult<
  any
> => async dispatch => {
  try {
    // Dispatch that we're starting to poll the server
    dispatch(pollServerData.request());
    // Dispatch our success
    dispatch(pollServerData.success());
  } catch (err) {
    // Catch the err
    dispatch(pollServerData.failure());
  }
};

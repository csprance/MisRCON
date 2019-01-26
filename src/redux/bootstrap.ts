/*
Refreshes all the applications state from one place.
Called on bootstrap and when refreshes are requested
to keep all app state up to date from an incoming network request
 */
import { createAsyncAction } from 'typesafe-actions';

import { AsyncThunkResult } from './redux-types';

import { hydrateMapFromDbThunk } from './mismap/actions';
import { hydratePlayersThunk } from './players/actions';
import { hydrateServersFromDbThunk } from './servers/actions';
import { hydrateTasksFromDbThunk } from './tasks/actions';

export const hydrateApplication = createAsyncAction(
  'app/HYDRATE_REQUEST',
  'mismap/HYDRATE_SUCCESS',
  'mismap/HYDRATE_FAILED'
)<void, void, string>();
export const hydrateApplicationThunk = (): AsyncThunkResult<
  void
> => async dispatch => {
  try {
    dispatch(hydrateApplication.request());
    await Promise.all([
      dispatch(hydrateMapFromDbThunk()),
      dispatch(hydrateTasksFromDbThunk()),
      dispatch(hydrateServersFromDbThunk()),
      dispatch(hydratePlayersThunk())
    ]);
    dispatch(hydrateApplication.success());
  } catch (e) {
    dispatch(hydrateApplication.failure(e.toString()));
  }
};

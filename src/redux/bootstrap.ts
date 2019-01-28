/*
Refreshes all the applications state from one place.
Called on bootstrap and when refreshes are requested
to keep all appState state up to date from an incoming network request
 */
import { createAsyncAction } from 'typesafe-actions';

import createConnection from '../db';
import { hydrateMapFromDbThunk } from './mismap/actions';
import { AsyncThunkResult } from './redux-types';
// import { hydratePlayersThunk } from './players/actions';
import { hydrateServersFromDbThunk } from './servers/actions';
import { hydrateTasksFromDbThunk } from './tasks/actions';

export const bootstrapApplication = createAsyncAction(
  'app/BOOTSTRAP_REQUEST',
  'app/BOOTSTRAP_SUCCESS',
  'app/BOOTSTRAP_FAILED'
)<void, void, string>();
export const bootstrapApplicationThunk = (): AsyncThunkResult<
  void
> => async dispatch => {
  try {
    dispatch(bootstrapApplication.request());
    await createConnection();

    await Promise.all([
      dispatch(hydrateMapFromDbThunk()),
      dispatch(hydrateTasksFromDbThunk()),
      dispatch(hydrateServersFromDbThunk())
    ]);
    dispatch(bootstrapApplication.success());
  } catch (e) {
    dispatch(bootstrapApplication.failure(e.toString()));
  }
};

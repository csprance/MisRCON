import { getConnection } from 'typeorm';
import { createAction, createAsyncAction } from 'typesafe-actions';

import Marker from '../../db/entities/Markers';
import { AsyncThunkResult } from '../redux-types';
import { MisMapState } from './types';

/*
Gets the stored tasks from the database and hydrates the store.
This function creates cron jobs and starts them so it should only be run once or all other jobs should be
canceled first
 */
export const hydrateFromDb = createAsyncAction(
  'mismap/HYDRATE_REQUEST',
  'mismap/HYDRATE_SUCCESS',
  'mismap/HYDRATE_FAILED'
)<void, MisMapState, string>();
export const hydrateFromDbThunk = (): AsyncThunkResult<void> => async (
  dispatch,
  getState
) => {
  try {
    dispatch(hydrateFromDb.request());
    const markers = await getConnection()
      .getRepository(Marker)
      .find({});
    const mismapState = getState().misMap;
    dispatch(hydrateFromDb.success({ ...mismapState, markers }));
  } catch (e) {
    dispatch(hydrateFromDb.failure(e.toString()));
  }
};

export const addMarker = createAction(
  'mismap/ADD_MARKER',
  resolve => (marker: Marker) => resolve(marker)
);

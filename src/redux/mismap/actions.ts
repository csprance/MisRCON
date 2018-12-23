import { getConnection } from 'typeorm';
import { createAsyncAction } from 'typesafe-actions';

import Marker from '../../db/entities/Marker';
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

export const addMarker = createAsyncAction(
  'mismap/ADD_MARKER_REQUEST',
  'mismap/ADD_MARKER_SUCCESS',
  'mismap/ADD_MARKER_FAILED'
)<void, MisMapState, string>();
export const addMarkerThunk = (
  markerToAdd: any
): AsyncThunkResult<void> => async (dispatch, getState) => {
  try {
    dispatch(addMarker.request());
    const markerRepo = await getConnection().getRepository(Marker);
    const marker = new Marker();
    marker.posX = markerToAdd.posX;
    marker.posY = markerToAdd.posY;
    marker.content = markerToAdd.content;
    marker.layer = 'test';
    const mismapState = getState().misMap;
    dispatch(
      addMarker.success({
        ...mismapState,
        markers: [...mismapState.markers, await markerRepo.save(marker)]
      })
    );
  } catch (e) {
    dispatch(addMarker.failure(e.toString()));
  }
};

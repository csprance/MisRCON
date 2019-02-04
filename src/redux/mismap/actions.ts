import { getConnection } from 'typeorm';
import { createAsyncAction } from 'typesafe-actions';

import Marker from '../../db/entities/Marker';
import { AsyncThunkResult } from '../redux-types';
import { ICustomMapMarker, MisMapState } from './types';

/*
Gets the stored tasks from the database and hydrates the store.
This function creates cron jobs and starts them so it should only be run once or all other jobs should be
canceled first
 */
export const hydrateMapFromDb = createAsyncAction(
  'mismap/HYDRATE_REQUEST',
  'mismap/HYDRATE_SUCCESS',
  'mismap/HYDRATE_FAILED'
)<void, MisMapState, string>();
export const hydrateMapFromDbThunk = (): AsyncThunkResult<void> => async (
  dispatch,
  getState
) => {
  try {
    dispatch(hydrateMapFromDb.request());
    const markers = await getConnection()
      .getRepository(Marker)
      .find({});
    const mismapState = getState().misMap;
    dispatch(hydrateMapFromDb.success({ ...mismapState, markers }));
  } catch (e) {
    dispatch(hydrateMapFromDb.failure(e.toString()));
  }
};

export const addCustomMapMarker = createAsyncAction(
  'mismap/ADD_CUSTOM_MARKER_REQUEST',
  'mismap/ADD_CUSTOM_MARKER_SUCCESS',
  'mismap/ADD_CUSTOM_MARKER_FAILED'
)<void, MisMapState, string>();
export const addMarkerThunk = (
  markerToAdd: ICustomMapMarker
): AsyncThunkResult<void> => async (dispatch, getState) => {
  try {
    dispatch(addCustomMapMarker.request());
    const markerRepo = await getConnection().getRepository(Marker);
    const marker = new Marker();
    marker.posX = markerToAdd.posX;
    marker.posY = markerToAdd.posY;
    marker.content = markerToAdd.content;
    marker.layer = markerToAdd.layer;
    marker.serverID = markerToAdd.serverID;
    const mismapState = getState().misMap;
    dispatch(
      addCustomMapMarker.success({
        ...mismapState,
        markers: [...mismapState.markers, await markerRepo.save(marker)]
      })
    );
  } catch (e) {
    dispatch(addCustomMapMarker.failure(e.toString()));
  }
};

export const deleteCustomMapMarker = createAsyncAction(
  'mismap/DELETE_CUSTOM_MARKER_REQUEST',
  'mismap/DELETE_CUSTOM_MARKER_SUCCESS',
  'mismap/DELETE_CUSTOM_MARKER_FAILED'
)<void, number, string>();
export const deleteMarkerThunk = (
  id: number
): AsyncThunkResult<void> => async dispatch => {
  try {
    dispatch(deleteCustomMapMarker.request());
    const markerRepo = await getConnection().getRepository(Marker);
    const marker = await markerRepo.findOneOrFail({ id });
    markerRepo.delete(marker.id);
    dispatch(deleteCustomMapMarker.success(id));
  } catch (e) {
    dispatch(deleteCustomMapMarker.success(id));
    dispatch(deleteCustomMapMarker.failure(e.toString()));
  }
};

import { createAction } from 'typesafe-actions';

import { Marker } from './types';

export const addMapMarker = createAction(
  'mismap/ADD_MARKER',
  resolve => (marker: Marker) => resolve(marker)
);

export const deleteMapMarker = createAction(
  'mismap/DELETE_MARKER',
  resolve => (id: number) => resolve(id)
);

import { createSelector } from 'reselect';
import Marker from '../../db/entities/Marker';
import { RootState } from '../redux-types';

export const misMapSelector = (state: RootState) => state.misMap;
export const misMapMarkersSelector = createSelector(
  misMapSelector,
  misMap => misMap.markers
);
export const markersByLayerNameSelector = createSelector(
  misMapMarkersSelector,
  markers => {
    const byLayer = markers.reduce((acc, val) => {
      if (acc[val.layer]) {
        acc[val.layer].push(val);
      } else {
        acc[val.layer] = [val];
      }
      return acc;
    }, {});
    const keys = Object.keys(byLayer);
    return keys.map(name => {
      return [name, byLayer[name]];
    }) as Array<[string, Marker[]]>;
  }
);

export const markersByLayerName = (
  markers: Marker[]
): Array<[string, Marker[]]> => {
  const byLayer = markers.reduce((acc, val) => {
    if (acc[val.layer]) {
      acc[val.layer].push(val);
    } else {
      acc[val.layer] = [val];
    }
    return acc;
  }, {});
  const keys = Object.keys(byLayer);
  return keys.map(name => {
    return [name, byLayer[name]];
  }) as Array<[string, Marker[]]>;
};

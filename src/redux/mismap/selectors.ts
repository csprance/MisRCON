import { createSelector } from 'reselect';
import { RootState } from '../redux-types';
import { activeServerSelector } from '../servers/selectors';
import { getMarkersByName } from './utils';

export const misMapSelector = createSelector(
  (state: RootState, _: any) => state.misMap,
  state => state
);

export const misMapMarkersSelector = createSelector(
  misMapSelector,
  misMap => misMap.markers
);

// organizes markers into an array of [[layerName, Marker]]
export const markersByLayerNameAndActiveServer = createSelector(
  misMapMarkersSelector,
  activeServerSelector,
  (markers, activeServer) => {
    const activeServerMarkers = markers.filter(
      marker => marker.serverID === activeServer.id
    );
    return getMarkersByName(activeServerMarkers);
  }
);

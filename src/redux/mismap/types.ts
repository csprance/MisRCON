import Marker from '../../db/entities/Marker';

export type MisMapMarkersByLayer = Array<[string, Marker[]]>;

export type MisMapState = {
  markers: Marker[];
};

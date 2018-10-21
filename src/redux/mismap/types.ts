import Marker from "../../db/entities/Markers";


export type MisMapMarkersByLayer  = Array<[string, Marker[]]>;

export type MisMapState = {
  markers: Marker[];
};


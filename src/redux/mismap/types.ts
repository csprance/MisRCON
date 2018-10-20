import Markers from "../../db/entities/Markers";


export type MisMapMarkersByLayer  = Array<[string, Markers[]]>;

export type MisMapState = {
  markers: Markers[];
};


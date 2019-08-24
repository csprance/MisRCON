export interface Marker {
  id: number;
  serverID: number;
  posX: number;
  posY: number;
  content: string;
  layer: string;
}

export type MisMapMarkersByLayer = Array<[LayerName, Marker[]]>;

export type LayerName = string;

export interface MisMapState {
  markers: Marker[];
}

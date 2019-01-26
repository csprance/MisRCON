export interface ICustomMapMarker {
  id: number;
  serverID: number;
  posX: number;
  posY: number;
  content: string;
  layer: string;
}

export type MisMapMarkersByLayer = Array<[LayerName, ICustomMapMarker[]]>;
export type LayerName = string;

export type MisMapState = {
  markers: ICustomMapMarker[];
};

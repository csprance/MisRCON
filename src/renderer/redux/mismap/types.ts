import * as L from 'leaflet';

export interface Marker {
  id: number;
  serverID: number;
  posX: number;
  posY: number;
  content: string;
  layer: string;
}

export type MisMapMarkersByLayer = [LayerName, Marker[]][];

export type LayerName = string;

export interface MisMapState {
  markers: Marker[];
}

export interface LeafletMapState {
  tileLayer: {
    url: {
      islands_sat: string;
    };
    crs: any;
    noWrap: boolean;
    bounds: L.LatLngBoundsLiteral;
    tms: boolean;
    attributionControl: boolean;
    trackResize: boolean;
    renderer: any;
    center: { lat: number; lng: number };
  };
  options: {
    center: { lat: number; lng: number };
    zoom: number;
    minZoom: number;
    maxZoom: number;
    maxBounds: L.LatLngBoundsLiteral;
  };
}

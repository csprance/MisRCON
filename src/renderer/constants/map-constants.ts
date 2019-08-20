/**
 * Name: map-constants
 * Description: Just a bunch of magic map numbers pulled out and named
 */
import * as L from 'leaflet';
import * as path from "path";
import { LeafletMapState } from "../redux/mismap/types";

// Theses are both used in the unproject function used to get markers projected from x,y,z to lat,lng in the CRS of the map
export const MAP_PROJECTION_SIZE = 8192;
export const MAP_PROJECTION_ZOOM = 5;

// At what number of rows do we switch from markers to heatmap
export const HEATMAP_LIMIT = 500;

export const MAP_BOUNDS = [[-90, -180], [90, 180]] as L.LatLngBoundsLiteral;
export const map: LeafletMapState = {
  tileLayer: {
    url: {
      islands_sat:
        process.mainModule!.filename.indexOf('app.asar') === -1
          ? path.join(
          __dirname,
          '../../../../../../resources/maps/islands_sat/{z}/{x}/{y}.png',
          )
          : path.join(
          __dirname,
          '../../../../../resources/maps/islands_sat/{z}/{x}/{y}.png',
          ),
    },
    crs: L.CRS.Simple,
    noWrap: true,
    bounds: MAP_BOUNDS,
    tms: true,
    attributionControl: false,
    trackResize: true,
    renderer: L.Canvas,
    center: { lat: -47, lng: -23 },
  },
  options: {
    center: { lat: -47, lng: -23 },
    zoom: 3,
    minZoom: 0,
    maxZoom: 6,
    maxBounds: MAP_BOUNDS,
  },
}
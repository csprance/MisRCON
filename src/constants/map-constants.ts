/**
 * Name: map-constants
 * Description: Just a bunch of magic map numbers pulled out and named
 */
import * as L from 'leaflet';

// Theses are both used in the unproject function used to get markers projected from x,y,z to lat,lng in the CRS of the map
export const MAP_PROJECTION_SIZE = 8196;
export const MAP_PROJECTION_ZOOM = 5;

// At what number of rows do we switch from markers to heatmap
export const HEATMAP_LIMIT = 500;

export const MAP_BOUNDS = [[-90, -180], [90, 180]] as L.LatLngBoundsLiteral;

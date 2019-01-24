import { Map } from 'leaflet';
import * as MAP_CONSTANTS from '../../constants/map-constants';

/**
 * Splits an x,y,z string '45,34,2' to a {lat, lng} to use in a leaflet map
 * uses the leaflet set in window.L
 * @param {string} str - The x, y, z string to split.
 * @param { Map } L - The leaflet map
 * @returns {object} The {lat: 34.234234, lng: -34.32343} object
 */
export function splitXYZToLatLng(str: string, L: Map) {
  if (str !== null) {
    const { x, y } = splitToVec3(str);
    const { lat } = L.unproject(
      [x, -y + MAP_CONSTANTS.MAP_PROJECTION_SIZE],
      MAP_CONSTANTS.MAP_PROJECTION_ZOOM
    );
    const { lng } = L.unproject(
      [x, -y + MAP_CONSTANTS.MAP_PROJECTION_SIZE],
      MAP_CONSTANTS.MAP_PROJECTION_ZOOM
    );
    return { lat, lng };
  }
  return { lat: -40, lng: 40 };
}

/**
 * Splits a vec3 string into a vec3 object
 * @example "0,0,0" -> {x: 0, y: 0, z: 0}
 * @param {string} str - "0,0,0" the string to split.
 * @returns {Object} - {x: 50, y: 20, z: 10} Object of x,y,z Numbers
 */
export const splitToVec3 = (
  str: string
): { x: number; y: number; z: number } => {
  const [x, y, z] = str.split(',').map(i => Number(i));
  return { x, y, z };
};

/**
 * Creates a tileset URL for the leaflet base layer map
 * @param {String} tileSet - the folder name to create the tile string
 * @returns {String} - TileSet URL
 */
export const createTileSiteUrl = (tileSet: string): string =>
  process.env.NODE_ENV === 'production'
    ? `../maps/${tileSet}/{z}/{x}/{y}.png`
    : `../resources/maps/${tileSet}/{z}/{x}/{y}.png`;

/**
 * takes a lat and lng and a map and returns an {x: x, y: y}
 * @param {Number} lat - latitude
 * @param {Number} lng - longitude
 * @param {L.Map} map - the leaflet map to use unproject with
 * @returns {Object} {x: x, y: y} - Object containing x and y keys/values
 */
export const convertLatLngToVec2 = (
  lat: number,
  lng: number,
  map: Map
): { x: number; y: number } => {
  const point = map.project({ lat, lng }, 5);
  return { x: point.x, y: 8196 - point.y };
};

/**
 * Checks if an array of objects has any positional data in it
 * @param {Array} data - The database response object
 * @returns {Boolean} true the object has response data false it does not
 */
export function containsPositionalData(data: any[]): boolean {
  return data[0].pos !== undefined || data[0].json_points !== undefined;
}

/**
 * Checks if an array of objects has any shape data in it
 * this means it has a column name json_points in it
 * @param {Array} data - The database response object
 * @returns {Boolean} true the object has response data false it does not
 */
export function containsShapeData(data: any[]): boolean {
  return data[0].json_points !== undefined;
}

/**
 * converts a vec2 to a lat, lng uses the leaflet set in window.L
 * @param {Number} x - x position
 * @param {Number} y - y position
 * @param {Map} L - The leaflet map instance
 * @returns {Object} - the lat lng object
 */
export const convertVec2ToLatLng = (
  x: number,
  y: number,
  L: Map
): { lat: number; lng: number } => {
  const { lat } = L.unproject(
    [x, -y + MAP_CONSTANTS.MAP_PROJECTION_SIZE],
    MAP_CONSTANTS.MAP_PROJECTION_ZOOM
  );
  const { lng } = L.unproject(
    [x, -y + MAP_CONSTANTS.MAP_PROJECTION_SIZE],
    MAP_CONSTANTS.MAP_PROJECTION_ZOOM
  );
  return { lat, lng };
};

import {ActionType} from "typesafe-actions";
import * as misMapActions from "./actions";

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

export type MisMapState = {
  markers: Marker[];
};
export type MisMapActions = ActionType<typeof misMapActions>;
import {ActionType} from "typesafe-actions";
import * as selfHostedActions from "./actions";

export type Vec3 = [number, number, number];

export interface Player {
  steamid: number;
  pos: Vec3;
  rot: Vec3;
}

export interface Vehicle {
  id: number;
  pos: Vec3;
  rot: Vec3;
}

export type SelfHostedState = {
  players: Player[];
  vehicles: Vehicle[];
};
export type SelfHostedActions = ActionType<typeof selfHostedActions>;
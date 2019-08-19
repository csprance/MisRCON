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

export interface SelfHostedState {
  players: Player[];
  vehicles: Vehicle[];
}

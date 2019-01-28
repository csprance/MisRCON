import { defaultPlayer } from '../state';

export const inActivePlayer = { ...defaultPlayer, serverID: 0, active: false };
export const activePlayer = { ...defaultPlayer, serverID: 0, active: true };
export const activePlayerOnDifferentServer = {
  ...defaultPlayer,
  serverID: -1,
  active: true
};
export const inActivePlayerOnDifferentServer = {
  ...defaultPlayer,
  serverID: -1,
  active: false
};
export const listOfPlayersOnSameServer = [
  activePlayer,
  activePlayer,
  inActivePlayer,
  inActivePlayer,
  activePlayerOnDifferentServer,
  inActivePlayerOnDifferentServer
];

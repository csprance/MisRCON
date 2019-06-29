import { defaultPlayer } from '../state';

export const inActivePlayer = {
  ...defaultPlayer,
  id: 1,
  steam: '76561198004442480',
  name: 'frank',
  serverID: 0,
  active: false
};
export const activePlayer1 = {
  ...defaultPlayer,
  id: 2,
  name: 'bob 1',
  steam: '76561198004442420',
  serverID: 0,
  active: true
};
export const activePlayer2 = {
  ...defaultPlayer,
  id: 5,
  name: 'bob 2',
  steam: '76561198004442420',
  serverID: 0,
  active: true
};
export const activePlayerOnDifferentServer = {
  ...defaultPlayer,
  id: 3,
  name: 'sally',
  steam: '76561198004442220',
  serverID: -1,
  active: true
};
export const inActivePlayerOnDifferentServer = {
  ...defaultPlayer,
  id: 4,
  name: 'tina',
  steam: '76561198004442221',
  serverID: -1,
  active: false
};
export const listOfPlayersOnSameServer = [
  activePlayer1,
  activePlayer2,
  inActivePlayer,
  inActivePlayer,
  activePlayerOnDifferentServer,
  inActivePlayerOnDifferentServer
];

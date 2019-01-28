// The Default state for the db
import Player from '../../db/entities/Player';
import { PlayersState } from './types';

export const defaultPlayer: Player = {
  id: -1,
  active: true,
  color: '#fff',
  serverID: -1,
  avatarUrl: 'http://placehold.it/42x42',
  notes: 'This is cSprance he is pretty cool',
  banned: [],
  whitelisted: [],
  steam: 76561198034520139,
  name: 'csprance',
  entID: 0,
  ip: '',
  ping: 0,
  state: 0,
  profile: 0
};

export default [defaultPlayer] as PlayersState;

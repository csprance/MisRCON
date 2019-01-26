// The Default state for the db
import { IPlayer, PlayersState } from './types';

export const defaultPlayer: IPlayer = {
  _id: 0,
  id: 0,
  active: true,
  serverID: 0,
  avatarUrl: 'http://placehold.it/42x42',
  notes: '',
  banned: [],
  whitelisted: [],
  steam: 0,
  name: '',
  entID: 0,
  ip: '',
  ping: 0,
  state: 0,
  profile: 0
};

export default [defaultPlayer] as PlayersState;

import * as AgGrid from 'ag-grid-community';
import Player from '../../db/entities/Player';
import { PlayersState } from './types';

export const defaultPlayer: Player = {
  id: -1,
  active: true,
  color: '#2bff1d',
  serverID: 3,
  avatarUrl: 'http://placehold.it/186x186',
  notes: 'This is the Default Player',
  banned: [3],
  whitelisted: [2],
  steam: '76561198034520139',
  seenOn: [2, 3],
  name: 'Default Player',
  entID: 0,
  ip: '',
  ping: 0,
  state: 0,
  profile: 0
};

export const playersColumnDefs: AgGrid.ColDef[] = [
  {
    cellRenderer: 'booleanRenderer',
    field: 'active',
    headerName: 'Active',
    width: 100,
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    sortable: true,
    filter: true,
    resizable: true
  },

  {
    field: 'steam',
    headerName: 'Steam ID',
    width: 250,
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 250,
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    field: 'whitelisted',
    headerName: 'Whitelisted On',
    width: 250,
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    field: 'banned',
    headerName: 'Banned On',
    width: 250,
    sortable: true,
    filter: true,
    resizable: true
  }
];
export default [defaultPlayer] as PlayersState;

import * as AgGrid from 'ag-grid-community';
import { Player, PlayersState } from './types';

export const defaultPlayer: Player = {
  id: -1,
  active: true,
  color: '#2bff1d',
  serverID: 1549434338846,
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
  profile: 0,
  location: 'xx'
};

export const playersColumnDefs: AgGrid.ColDef[] = [
  {
    cellRenderer: 'BooleanRenderer',
    field: 'active',
    headerName: 'Active',
    width: 125,
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    cellRenderer: 'NameRenderer',
    field: 'name',
    headerName: 'Name',
    width: 250,
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    cellRenderer: 'FlagRenderer',
    field: 'location',
    headerName: 'Location',
    width: 135,
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
    hide: true,
    filter: true,
    resizable: true
  },
  {
    field: 'banned',
    headerName: 'Banned On',
    width: 250,
    hide: true,
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    cellRenderer: 'KickControlsRenderer',
    field: 'kickControls',
    headerName: 'Kick',
    width: 135,
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    cellRenderer: 'BanControlsRenderer',
    field: 'banControls',
    headerName: 'Ban',
    width: 135,
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    cellRenderer: 'WhitelistControlsRenderer',
    field: 'whitelistControls',
    headerName: 'Whitelist',
    width: 135,
    sortable: true,
    filter: true,
    resizable: true
  }
];
export const defaultState: PlayersState = [];

export default defaultState;

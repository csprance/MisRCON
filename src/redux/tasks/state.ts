import * as AgGrid from 'ag-grid-community';

import Task from '../../db/entities/Task';
import { Dispatch, GetStateFunc } from '../redux-types';
import { OnTickFunctionFactory, TasksState } from './types';

/*
This is a function factory that takes dispatch, getState
returns a Function to run on each tick
 */
export const defaultOnTick: OnTickFunctionFactory = (
  dispatch: Dispatch,
  getState: GetStateFunc
) => async () => {
  console.log('Default Tick', dispatch, getState);
};

export const defaultRecurringTask: Task = {
  active: true,
  cronString: '9 9 * * * *',
  date: null,
  id: 0,
  job: null,
  name: 'Default cron',
  onTick: defaultOnTick,
  serverId: 0,
  timeZone: 'America/New_York'
};
export const defaultDateTask: Task = {
  ...defaultRecurringTask,
  cronString: null,
  date: new Date(Date.now())
};

export const tasksColumnDefs: AgGrid.ColDef[] = [
  {
    cellRenderer: 'taskControlsRenderer',
    field: 'active',
    headerName: 'Active',
    width: 100,
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    field: 'cronString',
    headerName: 'Cron',
    width: 250,
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 250,
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
    field: 'id',
    headerName: 'ID',
    width: 250,
    sortable: true,
    filter: true,
    resizable: true
  }
];

export default [] as TasksState;

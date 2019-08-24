import { createAction, createAsyncAction } from 'typesafe-actions';

import { runSetupScript } from '../../lib/run-spafbi-server-setup/run-spafbi-server-setup';
import { toggleAddServerDialog } from '../app/actions';
import { addError, addSuccess } from '../notifications/actions';
import { getPlayersViaRCONThunk } from '../players/actions';
import { sendRCONAsyncThunk } from '../rcon/actions';
import { AsyncThunkResult } from '../redux-types';
import { removeTaskThunk } from '../tasks/actions';
import { tasksByServerIdSelector } from '../tasks/selectors';
import { scanForTerminalsThunk } from '../terminal/actions';
import { serverIDsSelector } from './selectors';
import { Server } from './types';

export const testConnection = createAsyncAction(
  'server/TEST_CONN_REQUEST',
  'server/TEST_CONN_SUCCESS',
  'server/TEST_CONN_FAILED'
)<void, void, string>();
export const testConnectionThunk = (
  server: Server
): AsyncThunkResult<boolean> => async dispatch => {
  dispatch(testConnection.request());
  try {
    const req = await dispatch(
      sendRCONAsyncThunk({ ...server, command: 'status' })
    );
    if (req.completed) {
      // Check if a status command can make it through
      await dispatch(testConnection.success());
      dispatch(addSuccess('Connection Successful'));
      return true;
    }
    dispatch(addError('Connection Failed'));
    return false;
  } catch (e) {
    dispatch(testConnection.failure(e.toString()));
    return false;
  }
};

export const updateServer = createAsyncAction(
  'server/UPDATE_REQUEST',
  'server/UPDATE_SUCCESS',
  'server/UPDATE_FAILED'
)<void, Server, string>();
export const updateServerThunk = (
  server: Server
): AsyncThunkResult<void> => async dispatch => {
  dispatch(updateServer.request());
  try {
    await dispatch(updateServer.success(server));
    await dispatch(markServerActive(server.id));
    await dispatch(getPlayersViaRCONThunk());
    await dispatch(getServerDataThunk(server));
  } catch (e) {
    dispatch(updateServer.failure(e.toString()));
  }
};

export const addServer = createAsyncAction(
  'server/ADD_REQUEST',
  'server/ADD_SUCCESS',
  'server/ADD_FAILED'
)<void, Server, string>();
export const addServerThunk = (
  server: Server
): AsyncThunkResult<void> => async dispatch => {
  dispatch(addServer.request());
  try {
    await dispatch(addServer.success(server));
    await dispatch(scanForTerminalsThunk());
    await dispatch(markServerActive(server.id));
    await dispatch(getPlayersViaRCONThunk());
    await dispatch(getServerDataThunk(server));
  } catch (e) {
    dispatch(addServer.failure(e.toString()));
  }
};

export const removeServer = createAsyncAction(
  'server/REMOVE_REQUEST',
  'server/REMOVE_SUCCESS',
  'server/REMOVE_FAILED'
)<void, number, string>();
export const removeServerThunk = (id: number): AsyncThunkResult<void> => async (
  dispatch,
  getState
) => {
  dispatch(removeServer.request());
  try {
    // Get the tasks from that server
    const tasks = tasksByServerIdSelector(getState(), { id });
    for (const task of tasks) {
      // Remove them
      await dispatch(removeTaskThunk(task.id));
    }
    // If we can delete all the tasks then send the id to the reducer
    await dispatch(removeServer.success(id));
    // Mark the first server left in the list active
    const [firstServerID] = serverIDsSelector(getState()).reverse();
    if (firstServerID) {
      dispatch(markServerActive(firstServerID));
    } else {
      // If no servers left show server dialog
      dispatch(toggleAddServerDialog());
    }
  } catch (e) {
    dispatch(removeServer.failure(e.toString()));
  }
};

export const getServerData = createAsyncAction(
  'servers/GET_SERVER_DATA_REQUEST',
  'servers/GET_SERVER_DATA_SUCCESS',
  'servers/GET_SERVER_DATA_FAILED'
)<void, void, string>();
export const getServerDataThunk = (
  server: Server
): AsyncThunkResult<any> => async dispatch => {
  dispatch(getServerData.request());
  try {
    // Get status
    await dispatch(
      sendRCONAsyncThunk({
        command: 'status',
        ip: server.ip,
        port: server.port,
        password: server.password
      })
    );
    // Get banlist
    await dispatch(
      sendRCONAsyncThunk({
        command: 'mis_banlist_status',
        ip: server.ip,
        port: server.port,
        password: server.password
      })
    );
    // Get whitelist
    await dispatch(
      sendRCONAsyncThunk({
        command: 'mis_whitelist_status',
        ip: server.ip,
        port: server.port,
        password: server.password
      })
    );
    dispatch(getServerData.success());
  } catch (err) {
    dispatch(getServerData.failure(err.toString()));
  }
};

export const initServer = createAsyncAction(
  'server/INIT_REQUEST',
  'server/INIT_SUCCESS',
  'server/INIT_FAILED'
)<void, void, string>();
export const initServerThunk = (
  rootPath: string
): AsyncThunkResult<void> => async dispatch => {
  dispatch(initServer.request());
  try {
    await runSetupScript(rootPath);
    await dispatch(initServer.success());
  } catch (e) {
    dispatch(initServer.failure(e.toString()));
  }
};

export const markServerActive = createAction(
  'server/MARK_ACTIVE',
  resolve => (id: number) => resolve(id)
);

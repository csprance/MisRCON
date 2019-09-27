import { createAction, createAsyncAction } from 'typesafe-actions';

import { runSetupScript } from '../../lib/run-spafbi-server-setup/run-spafbi-server-setup';
import { toggleAddServerDialog } from '../app/actions';
import { addHosting, readHostingFileThunk } from '../hosting/actions';
import { addError, addSuccess } from '../notifications/actions';
import { sendRCONAsyncThunk } from '../rcon/actions';
import { AsyncThunkResult } from '../redux-types';
import { removeTaskThunk } from '../tasks/actions';
import { tasksByServerIdSelector } from '../tasks/selectors';
import { scanForTerminalsThunk } from '../terminal/actions';
import {
  activeServerCredentialsSelector,
  activeServerIDSelector,
  activeServerIsSelfHostedSelector,
  serverByIdSelector,
  serverIDsSelector
} from './selectors';
import { Server } from './types';

export const testConnection = createAsyncAction(
  'server/TEST_CONN_REQUEST',
  'server/TEST_CONN_SUCCESS',
  'server/TEST_CONN_FAILED'
)<undefined, undefined, string>();
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
)<undefined, Server, string>();
export const updateServerThunk = (
  server: Server
): AsyncThunkResult<void> => async dispatch => {
  dispatch(updateServer.request());
  try {
    await dispatch(updateServer.success(server));
    await dispatch(markServerActiveThunk(server.id));
    await dispatch(getServerDataThunk(server));
  } catch (e) {
    dispatch(updateServer.failure(e.toString()));
  }
};

export const addServer = createAsyncAction(
  'server/ADD_REQUEST',
  'server/ADD_SUCCESS',
  'server/ADD_FAILED'
)<undefined, Server, string>();
export const addServerThunk = (
  server: Server
): AsyncThunkResult<void> => async dispatch => {
  dispatch(addServer.request());
  try {
    await dispatch(addServer.success(server));
    await dispatch(scanForTerminalsThunk());
    await dispatch(markServerActiveThunk(server.id));
    await dispatch(addHosting(server.id, server.rootPath));
    await dispatch(getServerDataThunk(server));
  } catch (e) {
    dispatch(addServer.failure(e.toString()));
  }
};

export const removeServer = createAsyncAction(
  'server/REMOVE_REQUEST',
  'server/REMOVE_SUCCESS',
  'server/REMOVE_FAILED'
)<undefined, number, string>();
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
      dispatch(markServerActiveThunk(firstServerID));
    } else {
      // If no servers left show server dialog
      dispatch(toggleAddServerDialog());
    }
  } catch (e) {
    dispatch(removeServer.failure(e.toString()));
  }
};

export const getServerData = createAsyncAction(
  'server/GET_SERVER_DATA_REQUEST',
  'server/GET_SERVER_DATA_SUCCESS',
  'server/GET_SERVER_DATA_FAILED'
)<undefined, undefined, string>();
export const getServerDataThunk = (
  server: Server
): AsyncThunkResult<any> => async (dispatch, getState) => {
  dispatch(getServerData.request());
  try {
    const id = activeServerIDSelector(getState());
    const isSelfHosted = activeServerIsSelfHostedSelector(getState());
    if (isSelfHosted) {
      dispatch(readHostingFileThunk());
    }
    // Get status
    const status = await dispatch(
      sendRCONAsyncThunk({
        command: 'status',
        ip: server.ip,
        port: server.port,
        password: server.password,
        id
      })
    );
    // Get banlist
    const banlist = await dispatch(
      sendRCONAsyncThunk({
        command: 'mis_ban_status',
        ip: server.ip,
        port: server.port,
        password: server.password,
        id
      })
    );
    // Get whitelist
    const whitelist = await dispatch(
      sendRCONAsyncThunk({
        command: 'mis_whitelist_status',
        ip: server.ip,
        port: server.port,
        password: server.password,
        id
      })
    );
    if (status.completed && whitelist.completed && banlist.completed) {
      dispatch(getServerData.success());
    } else {
      dispatch(addError(status.response));
      dispatch(getServerData.failure(status.response));
    }
  } catch (err) {
    dispatch(addError(err.toString()));
    dispatch(getServerData.failure(err.toString()));
  }
};

/*
Init Server Runs the Spafbi Server inStall Script
 */
export const initServer = createAsyncAction(
  'server/INIT_REQUEST',
  'server/INIT_SUCCESS',
  'server/INIT_FAILED'
)<undefined, undefined, string>();
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

export const markServerActive = createAsyncAction(
  'server/MARK_SERVER_ACTIVE_REQUEST',
  'server/MARK_SERVER_ACTIVE_SUCCESS',
  'server/MARK_SERVER_ACTIVE_FAILED'
)<number, undefined, string>();
export const markServerActiveThunk = (
  id: number
): AsyncThunkResult<void> => async (dispatch, getState) => {
  dispatch(markServerActive.request(id));
  try {
    const server = serverByIdSelector(getState(), { id });
    if (server) {
      dispatch(getServerDataThunk(server));
      dispatch(markServerActive.success());
    } else {
      dispatch(markServerActive.failure('Server Not Found'));
    }
  } catch (err) {
    dispatch(markServerActive.failure(err.toString()));
  }
};

/*
Get the whitelist status for the active server
 */
export const getWhitelistStatus = createAsyncAction(
  'server/GET_WHITELIST_STATUS_REQUEST',
  'server/GET_WHITELIST_STATUS_SUCCESS',
  'server/GET_WHITELIST_STATUS_FAILED'
)<undefined, number, string>();
export const getWhitelistStatusThunk = (): AsyncThunkResult<any> => async (
  dispatch,
  getState
) => {
  dispatch(getWhitelistStatus.request());
  try {
    const request = {
      ...activeServerCredentialsSelector(getState()),
      command: 'mis_whitelist_status',
      id: activeServerIDSelector(getState())
    };
    await dispatch(sendRCONAsyncThunk(request));
    dispatch(getWhitelistStatus.success(activeServerIDSelector(getState())));
  } catch (err) {
    dispatch(getWhitelistStatus.failure(err.toString()));
  }
};

/*
Get the ban list status for the active server
 */
export const getBanlistStatus = createAsyncAction(
  'server/GET_BANLIST_STATUS_REQUEST',
  'server/GET_BANLIST_STATUS_SUCCESS',
  'server/GET_BANLIST_STATUS_FAILED'
)<undefined, number, string>();
export const getBanlistStatusThunk = (): AsyncThunkResult<any> => async (
  dispatch,
  getState
) => {
  dispatch(getBanlistStatus.request());
  try {
    const request = {
      ...activeServerCredentialsSelector(getState()),
      command: 'mis_ban_status',
      id: activeServerIDSelector(getState())
    };
    await dispatch(sendRCONAsyncThunk(request));
    dispatch(getBanlistStatus.success(activeServerIDSelector(getState())));
  } catch (err) {
    dispatch(getBanlistStatus.failure(err.toString()));
  }
};

export const reorderServers = createAction(
  'server/REORDER',
  action => (startIndex: number, endIndex: number) =>
    action({ startIndex, endIndex })
);

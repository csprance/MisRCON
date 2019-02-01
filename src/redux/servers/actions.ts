import { getConnection } from 'typeorm';
import { createAsyncAction } from 'typesafe-actions';
import Server from '../../db/entities/Server';
import { AsyncThunkResult } from '../redux-types';
import { markServerActiveOthersInactive } from './utils';

/*
Gets the state from the database and adds it to the store
 */
// Async Actions
export const hydrateServersFromDb = createAsyncAction(
  'servers/HYDRATE_REQUEST',
  'servers/HYDRATE_SUCCESS',
  'servers/HYDRATE_FAILED'
)<void, Server[], string>();
// Thunk
export const hydrateServersFromDbThunk = (): AsyncThunkResult<
  void
> => async dispatch => {
  try {
    dispatch(hydrateServersFromDb.request());
    const serverRepo = await getConnection().getRepository(Server);
    const servers = await serverRepo.find({});
    dispatch(hydrateServersFromDb.success(servers));
  } catch (e) {
    dispatch(hydrateServersFromDb.failure(e.toString()));
  }
};

/*
Adds a server to the database and to the redux store
 */
// Async Actions
export const addServerToDb = createAsyncAction(
  'servers/ADD_DB_REQUEST',
  'servers/ADD_DB_SUCCESS',
  'servers/ADD_DB_FAILED'
)<void, void, string>();
// Thunk
export const addServerToDbThunk = (
  server: Server
): AsyncThunkResult<void> => async dispatch => {
  try {
    dispatch(addServerToDb.request());
    const connection = await getConnection();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Server)
      .values([{ ...server }])
      .execute();
    dispatch(addServerToDb.success());
    await dispatch(hydrateServersFromDbThunk());
  } catch (e) {
    dispatch(addServerToDb.failure(e.toString()));
  }
};

/*
Adds a server to the database and to the redux store
 */
// Async Actions
export const removeServerFromDb = createAsyncAction(
  'servers/RM_DB_REQUEST',
  'servers/RM_DB_SUCCESS',
  'servers/RM_DB_FAILED'
)<void, void, string>();
// Thunk
export const removeServerFromDbThunk = (
  partial: Partial<Server>
): AsyncThunkResult<void> => async dispatch => {
  dispatch(removeServerFromDb.request());
  try {
    const connection = await getConnection();
    await connection
      .createQueryBuilder()
      .delete()
      .from(Server)
      .where({ ...partial })
      .execute();
    // Choose the first server as the active server
    await markServerActiveOthersInactive();
    dispatch(removeServerFromDb.success());
    await dispatch(hydrateServersFromDbThunk());
  } catch (e) {
    dispatch(removeServerFromDb.failure(e.toString()));
  }
};

export const markServerActive = createAsyncAction(
  'servers/MARK_ACTIVE_REQUEST',
  'servers/MARK_ACTIVE_SUCCESS',
  'servers/MARK_ACTIVE_FAILED'
)<void, void, string>();
// Thunk
export const markServerActiveThunk = (
  id: number
): AsyncThunkResult<void> => async dispatch => {
  try {
    const serverRepo = await getConnection().getRepository(Server);
    const allServers = await serverRepo.find({});
    dispatch(markServerActive.request());
    await Promise.all(
      allServers.map(async server => {
        server.active = server.id === id;
        await serverRepo.save(server);
      })
    );
    dispatch(markServerActive.success());
    await dispatch(hydrateServersFromDbThunk());
  } catch (e) {
    dispatch(markServerActive.failure(e.toString()));
  }
};

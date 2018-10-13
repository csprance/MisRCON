import { getConnection } from 'typeorm';
import { createAsyncAction } from 'typesafe-actions';
import Server from '../../db/entities/Server';
import { AsyncThunkResult, ThunkResult } from '../redux-types';
import { IServer, ServersState } from './types';

// //////////////
// Thunks
// //////////////
export const getServersThunk = (): ThunkResult<ServersState> => (
  _d,
  getState
) => getState().servers;

/*
Gets the state from the database and adds it to the store
 */
// Async Actions
export const hydrateFromDb = createAsyncAction(
  'servers/HYDRATE_REQUEST',
  'servers/HYDRATE_SUCCESS',
  'servers/HYDRATE_FAILED'
)<void, ServersState, string>();
// Thunk
export const hydrateFromDbThunk = (): AsyncThunkResult<
  void
> => async dispatch => {
  try {
    dispatch(hydrateFromDb.request());
    const serverRepo = await getConnection().getRepository(Server);
    const servers = await serverRepo.find({});
    dispatch(hydrateFromDb.success(servers));
  } catch (e) {
    dispatch(hydrateFromDb.failure(e.toString()));
  }
};

/*
Adds a server to the database and to the redux store
 */
// Async Actions
export const addToDb = createAsyncAction(
  'servers/ADD_DB_REQUEST',
  'servers/ADD_DB_SUCCESS',
  'servers/ADD_DB_FAILED'
)<void, void, string>();
// Thunk
export const addToDbThunk = (
  server: IServer
): AsyncThunkResult<void> => async dispatch => {
  try {
    dispatch(addToDb.request());
    const connection = await getConnection();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Server)
      .values([{ ...server }])
      .execute();
    dispatch(addToDb.success());
    dispatch(hydrateFromDbThunk());
  } catch (e) {
    dispatch(addToDb.failure(e.toString()));
  }
};

/*
Adds a server to the database and to the redux store
 */
// Async Actions
export const removeFromDb = createAsyncAction(
  'servers/RM_DB_REQUEST',
  'servers/RM_DB_SUCCESS',
  'servers/RM_DB_FAILED'
)<void, void, string>();
// Thunk
export const removeFromDbThunk = (
  partial: Partial<IServer>
): AsyncThunkResult<void> => async dispatch => {
  try {
    const connection = await getConnection();
    dispatch(removeFromDb.request());
    await connection
      .createQueryBuilder()
      .delete()
      .from(Server)
      .where({ ...partial })
      .execute();
    dispatch(removeFromDb.success());
    dispatch(hydrateFromDbThunk());
  } catch (e) {
    dispatch(removeFromDb.failure(e.toString()));
  }
};

export const markActive = createAsyncAction(
  'servers/MARK_ACTIVE_REQUEST',
  'servers/MARK_ACTIVE_SUCCESS',
  'servers/MARK_ACTIVE_FAILED'
)<void, void, string>();
// Thunk
export const markActiveThunk = (
  id: string
): AsyncThunkResult<void> => async dispatch => {
  try {
    const serverRepo = await getConnection().getRepository(Server);
    const allServers = await serverRepo.find({});
    dispatch(markActive.request());
    await Promise.all(
      allServers.map(async server => {
        server.active = server.id === id;
        await serverRepo.save(server);
      })
    );
    dispatch(markActive.success());
    dispatch(hydrateFromDbThunk());
  } catch (e) {
    dispatch(markActive.failure(e.toString()));
  }
};

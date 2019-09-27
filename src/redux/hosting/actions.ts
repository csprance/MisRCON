import * as fs from 'fs';
import { join } from 'path';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { AsyncThunkResult } from '../redux-types';
import {
  activeServerIDSelector,
  activeServerRootPathSelector
} from '../servers/selectors';

/*
 * update hosting state
 * Load hosting.cfg file
 * Do diff if diff
 * Warn user of save status
 * use hosting state to write to hosting.cfg file
 */
export const updateHosting = createAsyncAction(
  'hosting/UPDATE_REQUEST',
  'hosting/UPDATE_SUCCESS',
  'hosting/UPDATE_FAILED',
  'hosting/UPDATE_CANCEL'
)<undefined, undefined, string>();
export const updateHostingThunk = (
  force: boolean = false
): AsyncThunkResult<any> => async (dispatch, _getState) => {
  dispatch(updateHosting.request());
  try {
    if (force) {
      dispatch(updateHosting.success());
    }
  } catch (err) {
    dispatch(updateHosting.failure(err.toString()));
  }
};

export const readHostingFile = createAsyncAction(
  'hosting/READ_HOSTING_FILE_REQUEST',
  'hosting/READ_HOSTING_FILE_SUCCESS',
  'hosting/READ_HOSTING_FILE_FAILED'
)<undefined, { hostingText: string; id: number }, string>();
export const readHostingFileThunk = (): AsyncThunkResult<void> => async (
  dispatch,
  getState
) => {
  dispatch(readHostingFile.request());
  try {
    const activeServerID = activeServerIDSelector(getState());
    const activeServerRootPath = activeServerRootPathSelector(getState());
    const hosting = await fs.promises.readFile(
      join(activeServerRootPath, 'hosting.cfg')
    );

    dispatch(
      readHostingFile.success({
        hostingText: String(hosting),
        id: activeServerID
      })
    );
  } catch (err) {
    dispatch(readHostingFile.failure(err.toString()));
  }
};

export const setHostingPath = createAction(
  'hosting/SET_HOSTING_PATH',
  action => (path: string, id: number) => action({ path, id })
);

export const setHostingText = createAction(
  'hosting/SET_HOSTING_TEXT',
  action => (text: string, id: number) => action({ text, id })
);

export const addHosting = createAction(
  'hosting/ADD_HOSTING',
  action => (id: number, rootPath: string) => action({ id, rootPath })
);

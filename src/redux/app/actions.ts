import axios from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';
import * as npmPackage from '../../../package.json';
import { AsyncThunkResult } from '../redux-types';

export const fetchServerHelpMarkdown = createAsyncAction(
  'markdown/REQUEST',
  'markdown/SUCCESS',
  'markdown/FAIL'
)<undefined, string, string>();
export const fetchServerHelpMarkdownThunk = (): AsyncThunkResult<
  void
> => async dispatch => {
  try {
    dispatch(fetchServerHelpMarkdown.request());
    const { data } = await axios.get(
      'https://gist.githubusercontent.com/csprance/8599e46529853d206b5b7b181212ee83/raw'
    );
    dispatch(fetchServerHelpMarkdown.success(data));
  } catch (e) {
    dispatch(fetchServerHelpMarkdown.failure(e.toString()));
  }
};

export const checkForUpdates = createAsyncAction(
  'app/CHECK_FOR_UPDATE_REQUEST',
  'app/CHECK_FOR_UPDATE_SUCCESS',
  'app/CHECK_FOR_UPDATE_FAIL'
)<undefined, boolean, string>();
export const checkForUpdatesThunk = (): AsyncThunkResult<
  void
> => async dispatch => {
  try {
    dispatch(checkForUpdates.request());
    const { data } = await axios.get(
      'https://api.github.com/repos/csprance/MisRCON/releases/latest'
    );
    const remoteVersion = data.tag_name;
    dispatch(
      checkForUpdates.success(`v${npmPackage.version}` !== remoteVersion)
    );
  } catch (e) {
    dispatch(checkForUpdates.failure(e.toString()));
  }
};

export const setTerminalTheme = createAction(
  'app/SET_TERMINAL_THEME',
  resolve => (themeName: string) => resolve(themeName)
);

// Show/Hide the player profile dialog
export const togglePlayerProfileDialog = createAction(
  'app/TOGGLE_PLAYER_PROFILE'
);

// Hide the player profile dialog
export const hidePlayerProfileDialog = createAction('app/HIDE_PLAYER_PROFILE');

export const setPlayerActiveInPlayerProfile = createAction(
  'app/SET_PLAYER',
  resolve => (steam: string) => resolve(steam)
);

export const togglePlayerList = createAction('app/TOGGLE_PLAYER_LIST');

export const toggleAddServerDialog = createAction(
  'app/TOGGLE_ADD_SERVER_DIALOG'
);

export const toggleUpdateServerDialog = createAction(
  'app/TOGGLE_UPDATE_SERVER_DIALOG'
);

export const toggleSettingsDialog = createAction('app/TOGGLE_SETTING_DIALOG');

export const toggleAddTaskDialog = createAction('app/TOGGLE_ADD_TASK_DIALOG');

export const toggleAddWhitelistDialog = createAction(
  'app/TOGGLE_ADD_WHITELIST_DIALOG'
);

export const toggleAddBanDialog = createAction('app/TOGGLE_ADD_BAN_DIALOG');

export const closeAllDialogs = createAction('app/CLOSE_ALL_DIALOGS');

export const firstRun = createAction('app/FIRST_RUN');

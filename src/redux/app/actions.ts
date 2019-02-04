import axios from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { AsyncThunkResult } from '../redux-types';

export const fetchServerHelpMarkdown = createAsyncAction(
  'markdown/REQUEST',
  'markdown/SUCCESS',
  'markdown/FAIL'
)<void, string, string>();
export const fetchServerHelpMarkdownThunk = (): AsyncThunkResult<
  void
> => async (dispatch) => {
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

// Show/Hide the player profile dialog
export const togglePlayerProfileDialog = createAction(
  'app/TOGGLE_PLAYER_PROFILE'
);

// Hide the player profile dialog
export const hidePlayerProfileDialog = createAction(
  'app/HIDE_PLAYER_PROFILE'
);

export const setPlayerActiveInPlayerProfile = createAction(
  'app/SET_PLAYER',
  resolve => (steam: string) => resolve(steam)
);

export const togglePlayerList = createAction('app/TOGGLE_PLAYER_LIST');

export const toggleAddServerDialog = createAction(
  'app/TOGGLE_ADD_SERVER_DIALOG'
);

export const toggleSettingsDialog = createAction('app/TOGGLE_SETTING_DIALOG');

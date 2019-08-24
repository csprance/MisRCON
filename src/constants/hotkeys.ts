import * as electron from 'electron';
import * as mousetrap from 'mousetrap';

import {
  toggleAddBanDialog,
  toggleAddTaskDialog,
  toggleAddWhitelistDialog
} from '../redux/app/actions';
import { Dispatch } from '../redux/redux-types';

export const registerHotkeys = (dispatch: Dispatch) => {
  // Reload Electron
  mousetrap.bind('ctrl+r', () => {
    electron.remote.getCurrentWindow().reload();
  });

  // Load Dev Tools
  mousetrap.bind('ctrl+alt+i', () => {
    electron.remote.getCurrentWindow().webContents.openDevTools();
  });

  // Task Dialog
  mousetrap.bind('ctrl+t', () => {
    dispatch(toggleAddTaskDialog());
  });

  // Ban Dialog
  mousetrap.bind('ctrl+b', () => {
    dispatch(toggleAddBanDialog());
  });

  // Whitelist Dialog
  mousetrap.bind('ctrl+w', () => {
    dispatch(toggleAddWhitelistDialog());
  });


};

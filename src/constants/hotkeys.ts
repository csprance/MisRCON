import * as electron from 'electron';

import * as mousetrap from 'mousetrap';

export const registerHotkeys = () => {
  // Reload Electron
  mousetrap.bind('ctrl+r', () => {
    electron.remote.getCurrentWindow().reload();
  });
};

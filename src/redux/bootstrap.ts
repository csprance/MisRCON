import { Store } from 'redux';

import { registerHotkeys } from '../constants/hotkeys';
import {
  checkForUpdatesThunk,
  fetchServerHelpMarkdownThunk,
  firstRun,
  toggleAddServerDialog
} from './app/actions';
import { firstRunSelector } from './app/selectors';
import { Dispatch, GetStateFunc } from './redux-types';
import { hydrateTaskThunk } from './tasks/actions';
import { scanForTerminalsThunk } from './terminal/actions';

// This is the callback function from the redux-persist persistor
// It is called after the store is rehydrated
export default (store: Store) => () => {
  const {
    dispatch,
    getState
  }: { dispatch: Dispatch; getState: GetStateFunc } = store;

  // First Run Bootstrap
  if (firstRunSelector(getState())) {
    dispatch(firstRun());
    dispatch(toggleAddServerDialog());
  }

  // We send this thunk to start all the node-cron Cronjobs so they have dispatch,getState,Task
  dispatch(hydrateTaskThunk());
  // Fetch the server markdown right away
  dispatch(fetchServerHelpMarkdownThunk());
  // Scan or any new terminals
  dispatch(scanForTerminalsThunk());
  // Check for updates
  dispatch(checkForUpdatesThunk());

  // Register all the apps hotkeys
  registerHotkeys(dispatch);
};

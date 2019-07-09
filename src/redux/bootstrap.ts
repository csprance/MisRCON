import { Store } from 'redux';

import { registerHotkeys } from '../constants/hotkeys';
import { fetchServerHelpMarkdownThunk } from './app/actions';
import { Dispatch } from './redux-types';
import { hydrateTaskThunk } from './tasks/actions';
import { scanForTerminalsThunk } from './terminal/actions';

// This is the callback function from the redux-persist persistor
// It is called after the store is rehydrated
export default (store: Store) => () => {
  const { dispatch }: { dispatch: Dispatch } = store;
  // We send this thunk to start all the node-cron Cronjobs so they have dispatch,getState,Task
  dispatch(hydrateTaskThunk());
  // Fetch the server markdown right away
  dispatch(fetchServerHelpMarkdownThunk());
  // Scan or any new terminals
  dispatch(scanForTerminalsThunk());
  registerHotkeys(dispatch);
};

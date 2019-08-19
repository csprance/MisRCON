// The appState state contains all the state that is used to run the appState
// Dialogs / User Settings / Misc Data
import * as actions from './actions';
import reducer from './reducer';
import * as selectors from './selectors';
import defaultState from './state';
import { AppActions, AppState } from './types';

export default reducer;
export { actions, defaultState, selectors, AppState, AppActions };

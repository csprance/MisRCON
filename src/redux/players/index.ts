import * as playersActions from './actions';
import reducer, { PlayersActions } from './reducer';
import * as playersSelectors from './selectors';
import defaultPlayerState from './state';
import { PlayersState } from './types';

export {
  defaultPlayerState,
  playersActions,
  playersSelectors,
  PlayersState,
  PlayersActions
};

export default reducer;

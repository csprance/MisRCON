import { createReducer } from 'typesafe-actions';

import * as rconActions from './actions';
import { default as defaultState } from './state';

export default createReducer(defaultState)
  .handleAction(rconActions.sendRCON.request, state => ({
    ...state,
    sending: true
  }))
  .handleAction(rconActions.sendRCON.success, (state, action) => ({
    ...state,
    sending: false,
    requests: [action.payload, ...state.requests.slice(0, 50)]
  }))
  .handleAction(rconActions.sendRCON.failure, (state, action) => ({
    ...state,
    sending: false,
    requests: [action.payload, ...state.requests.slice(0, 50)]
  }));

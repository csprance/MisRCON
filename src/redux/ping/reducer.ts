import { createReducer } from 'typesafe-actions';

import { actions } from './index';
import defaultPingState from './state';

export default createReducer(defaultPingState).handleAction(
  actions.addPingMetric,
  (state, action) => [
    ...state,
    { ...action.payload, id: Math.max(...state.map(s => s.id)) + 1 }
  ]
);

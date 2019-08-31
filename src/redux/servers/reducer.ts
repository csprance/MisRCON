import { createReducer } from 'typesafe-actions';

import * as serversActions from './actions';
import { default as defaultState } from './state';

export default createReducer(defaultState)
  .handleAction(serversActions.updateServer.success, (state, action) => [
    // Filter the old server id out and add the new one in
    ...state.filter(server => server.id !== action.payload.id),
    action.payload
  ])

  .handleAction(serversActions.addServer.success, (state, action) => [
    ...state,
    action.payload
  ])

  .handleAction(serversActions.markServerActive.request, (state, action) =>
    state.map(server => ({
      ...server,
      active: server.id === action.payload
    }))
  )

  .handleAction(serversActions.removeServer.success, (state, action) =>
    state.filter(server => server.id !== action.payload)
  )

  .handleAction(serversActions.reorderServers, (state, action) => {
    const { startIndex, endIndex } = action.payload;
    const result = Array.from(state);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  });

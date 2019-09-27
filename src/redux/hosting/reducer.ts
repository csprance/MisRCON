import { createReducer } from 'typesafe-actions';

import { actions } from './index';
import defaultState from './state';

export default createReducer(defaultState)
  .handleAction(actions.setHostingPath, (state, action) =>
    state.map(h => ({
      ...h,
      hostingPath:
        h.id === action.payload.id ? action.payload.path : h.hostingPath
    }))
  )

  .handleAction(actions.readHostingFile.success, (state, action) =>
    state.map(h => ({
      ...h,
      hostingText:
        h.id === action.payload.id ? action.payload.hostingText : h.hostingText
    }))
  )

  .handleAction(actions.addHosting, (state, action) => [
    ...state,
    {
      id: action.payload.id,
      hostingPath: action.payload.rootPath + `\\hosting.cfg`,
      diff: false,
      hostingText: ''
    }
  ])

  .handleAction(actions.setHostingText, (state, action) =>
    state.map(h => ({
      ...h,
      hostingText:
        h.id === action.payload.id ? action.payload.text : h.hostingPath
    }))
  );

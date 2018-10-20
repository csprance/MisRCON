import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { rootReducer } from './index';
import { RootAction, RootState } from './redux-types';

export const configureStore = () => {
  const composeEnhancers =
    // TODO: FIX REDUX DEV TOOLS
    // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose;
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        thunk as ThunkMiddleware<RootState, RootAction>,
        createLogger({
          predicate: (_, action) => !/^@@/.test(action.type),
          collapsed: true
        })
      )
    )
  );
};

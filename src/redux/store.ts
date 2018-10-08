import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { rootReducer } from './index';
import { RootAction, RootState } from './redux-types';

export const configureStore = () => {

  return createStore(rootReducer, applyMiddleware(
    (thunk as ThunkMiddleware<RootState, RootAction>),
    createLogger({
      predicate: (_, action) => !/^@@/.test(action.type),
      collapsed: false
    })
  ));
};

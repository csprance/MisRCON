import createMemoryHistory from 'history/createMemoryHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { rootReducer } from './index';
import { RootAction, RootState } from './redux-types';

const memoryHistory = createMemoryHistory();

export const configureStore = () => {
  // FIXME: This is a hack tof ix redux dev tools not working with redux 4
  // tslint:disable:no-var-requires
  const reduxModule = require('redux');
  reduxModule.__DO_NOT_USE__ActionTypes.INIT = '@@redux/INIT';
  reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/REPLACE';
  // End Hack

  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(memoryHistory),
        thunk as ThunkMiddleware<RootState, RootAction>,
        createLogger({
          predicate: (_, action) => !/^@@/.test(action.type),
          collapsed: true
        })
      )
    )
  );
};

import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import {
  functionTransform,
  outputTransformers,
  passwordTransform
} from '../lib/value-transformers';
import bootstrap from './bootstrap';
import { rootReducer } from './index';
import { RootAction, RootState } from './redux-types';

export const configureStore = () => {
  // FIXME: This is a hack tof ix redux dev tools not working with redux 4 in electron
  const reduxModule = require('redux'); // tslint:disable:no-var-requires
  reduxModule.__DO_NOT_USE__ActionTypes.INIT = '@@redux/INIT';
  reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/REPLACE';
  // End Hack

  // redux-persist config
  const persistConfig = {
    key: 'root',
    storage,
    transforms: [functionTransform, outputTransformers, passwordTransform],
    blacklist: ['notifications']
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistedReducer,
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

  const persistor = persistStore(store, {}, bootstrap(store));

  return { store, persistor };
};

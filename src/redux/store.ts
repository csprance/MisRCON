import * as electronIsDev from 'electron-is-dev';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import {
  functionTransform,
  outputTransformers,
  passwordTransform
} from '../lib/value-transformers';
import { defaultState } from './app';
import bootstrap from './bootstrap';
import { rootReducer } from './index';
import { RootAction, RootState } from './redux-types';

export const configureStore = () => {
  // State Migrations
  const migrations = {
    '0': (state: RootState) => {
      return {
        ...state,
        app: {
          ...defaultState,
          updateNeeded: false,
          addServerDialogOpen: false
        }
      };
    }
  };

  // redux-persist config
  const persistConfig = {
    version: 0,
    key: 'root',
    migrate: createMigrate(migrations as any, { debug: electronIsDev }),
    storage,
    transforms: [functionTransform, outputTransformers, passwordTransform],
    blacklist: ['notifications']
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middlewares = [thunk as ThunkMiddleware<RootState, RootAction>];

  if (electronIsDev) {
    middlewares.push(
      createLogger({
        predicate: (_, action) => !/^@@/.test(action.type),
        collapsed: true
      })
    );
  }

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store, {}, bootstrap(store));

  return { store, persistor };
};

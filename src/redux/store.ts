import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { DEV } from '../constants/env';
import { IRootState, rootReducer } from './index';

export const configureStore = (): Store<IRootState> => {
  const composeEnhancers =
    (DEV && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const mw = [thunk];
  if (!DEV) {
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => undefined;
    }
  } else {
    mw.push(createLogger({
      predicate: (_, action) => !/^@@/.test(action.type),
      collapsed: true
    }) as any);
  }

  return createStore<IRootState>(
    rootReducer,
    composeEnhancers(applyMiddleware(...mw))
  );
};

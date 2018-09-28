import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer, IRootState } from './index';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { DEV } from '../constants/env';

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

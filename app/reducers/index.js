import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import notify from './notifyReducer';
import rcon from './rconReducer';

const rootReducer = combineReducers({
  notify,
  rcon,
  routing
});

export default rootReducer;

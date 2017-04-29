import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import notify from './notifyReducer';
import rcon from './rconReducer';
import credentials from './credentialsReducer';

const rootReducer = combineReducers({
  notify,
  rcon,
  credentials,
  routing
});

export default rootReducer;

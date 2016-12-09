// TODO: Jump To Redux if Needed!
// This file is only a placeholder it is not used for now
import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import tasks from './tasks';

const rootReducer = combineReducers({
  tasks,
  routing
});

export default rootReducer;

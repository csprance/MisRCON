import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import notify from './notifyReducer';
import rcon from './rconReducer';
import credentials from './credentialsReducer';
import server from './serverReducer';
import eventLogs from './eventLogReducer';
import tasks from './scheduledTasksReducer';

const rootReducer = combineReducers({
  credentials,
  eventLogs,
  notify,
  rcon,
  routing,
  server,
  tasks
});

export default rootReducer;

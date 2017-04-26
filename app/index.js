import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './styles/app.global.css';
import './styles/Resizer.global.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import localstore from 'store';

import {loginInfo, chatLogPath, damageLogPath} from './secrets';
import {log} from './utils/loggerUtils';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
log('silly', 'MisRCON Starting up');

//
// // This is for debugging the avatars not displaying
// log('silly', 'MisRCON IS STILL CLEARING LOCAL STORAGE AT STARTUP!!!');
// localstore.clear();
// localstore.set('userCredentials',loginInfo);
// localstore.set('chatLogPath',chatLogPath);
// localstore.set('damageLogPath',damageLogPath);


render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

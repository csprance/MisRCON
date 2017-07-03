/**
 * Name: updateUtils
 * Created by chris on 5/5/2017.
 * Description:
 */
import React from 'react';
import store from 'store';
import axios from 'axios';

import Link from '../components/common/ExternalLink';
import * as externals from '../../package.json';
import * as notify from '../actions/notifyActions';

// bootstrap the app to check and make sure we have the latest version and if not notify the user about it
export function bootStrap(dispatch) {
  store.set('version', externals.version);
  const notification = (
    <Link to={'https://github.com/csprance/MisRCON/releases/latest'}>
      An Update is available Click here to download.
    </Link>
  );
  axios
    .get('https://misrcon-updater.firebaseio.com/version.json')
    .then(res => {
      if (res.data !== store.get('version')) {
        dispatch(notify.emitInfo(notification));
      }
    })
    .catch(e => {
      console.log(e);
    });
}

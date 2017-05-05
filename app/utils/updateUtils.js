/**
 * Name: updateUtils
 * Created by chris on 5/5/2017.
 * Description:
 */
import store from 'store';
import * as externals from '../../package.json';

// bootstrap the app to make sure we have the credentials key in local storage
export function bootStrap() {
  store.set('version', externals.version);
}

//TODO: Document bootStrap addCredentials removeCredentials getStoredCredentials credentialConstraints credsAreValid credentialsHaveChanged
/**
 * Name: credentialsUtils
 * Created by chris on 4/29/2017.
 * Description:
 */
import store from 'store';
import validate from 'validate.js';

// bootstrap the app to make sure we have the credentials key in local storage
export function bootStrap() {
  if (store.get('credentials') === undefined) {
    store.set('credentials', []);
  }
}

export function addCredentials(credentials) {
  store.set('credentials', [].concat(store.get('credentials'), [credentials]));
}

export function removeCredentials(name) {
  store.set(
    'credentials',
    store.get('credentials').filter(i => i.name !== name)
  );
}

export function getStoredCredentials() {
  return store.get('credentials') === undefined ? [] : store.get('credentials');
}

// turn it into a function to ensure we always have the latest from store
export const credentialConstraints = () => {
  return {
    name: {
      presence: true,
      exclusion: {
        within: getStoredCredentials().map(i => i.name),
        message: 'Already used'
      }
    },
    port: {
      presence: true,
      length: 5,
      numericality: true
    },
    password: {
      presence: true
    },
    ip: {
      presence: true,
      format: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    }
  };
};

export function credsAreValid(credentials) {
  const retVal = validate(credentials, credentialConstraints());
  return retVal === undefined ? true : retVal;
}

export function credentialsHaveChanged(nextProps) {
  return nextProps.credentials.active.name.length > 0;
}

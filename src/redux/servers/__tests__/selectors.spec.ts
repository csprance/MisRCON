import * as serversSelectors from '../selectors';
import { activeServer0, allServers } from './state-mocks';

describe('Test Server Selectors', () => {
  it('Should Select all Active Server', () => {
    expect(
      serversSelectors.activeServerSelector.resultFunc(allServers)
    ).toEqual(activeServer0);
  });

  it('Should Select the active servers credentials', () => {
    expect(
      serversSelectors.activeServerCredentialsSelector.resultFunc(
        serversSelectors.activeServerSelector.resultFunc(allServers)
      )
    ).toEqual({
      ip: 'loading',
      port: 0,
      password: 'THisIsCool324HashMan'
    });
  });
});

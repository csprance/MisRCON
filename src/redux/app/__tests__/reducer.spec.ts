import reducer, { actions } from '../index';
import defaultState from '../state';

describe('UI Reducer', () => {
  it('Should Show player profile', () => {
    expect(reducer(defaultState, actions.togglePlayerProfileDialog())).toEqual({
      ...defaultState,
      playerProfileDialog: true
    });
  });
});

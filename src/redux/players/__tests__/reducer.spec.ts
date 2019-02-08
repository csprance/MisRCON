import playersReducer, { playersActions } from '../index';
import { defaultPlayer } from '../state';

describe('Players Reducer', () => {
  it('should return initial state', () => {
    expect(
      playersReducer(undefined, playersActions.markAllPlayersInactive())
    ).toEqual([{ ...defaultPlayer, active: false }]);
  });
});

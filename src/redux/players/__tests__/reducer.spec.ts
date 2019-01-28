import playersReducer, { playersActions } from '../index';

describe('Players Reducer', () => {
  it('should return initial state', () => {
    expect(
      playersReducer(undefined, playersActions.hydratePlayers.success([]))
    ).toEqual([]);
  });
});

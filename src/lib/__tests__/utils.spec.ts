import { noop, zip } from '../utils';

describe('Test Utils', () => {
  it('should test zip function', () => {
    const a = [1, 2, 3];
    const b = ['a', 'b', 'c'];
    const results = zip(a, b);
    expect(results).toStrictEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
  });

  it('should test noop function', () => {
    expect(noop()).toBe(undefined);
  });
});

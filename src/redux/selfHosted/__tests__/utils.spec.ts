import * as utils from '../utils';

describe('selfHosted Utils', () => {
  it('Can Poll the Server', async () => {
    const data = await utils.test();
    expect(data).toBe(false);
  });
});

import { runSetupScript } from '../run-spafbi-server-setup';

describe('Test Spafbi CMD', () => {
  it('Should Download the script', async () => {
    const TEST_ROOT_PATH =
      'D:\\web-dev-projects\\misrcon\\src\\lib\\run-spafbi-server-setup\\__tests__';
    const results = await runSetupScript(TEST_ROOT_PATH);
    expect(results).toBe(true);
  });
});

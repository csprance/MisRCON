import { decryptPassword, encryptPassword } from '../crypto';

describe('Crypto Module', () => {
  it('should encrypt and decrypt to same string', () => {
    const originalPass = 'TestPassword';
    const encrypted = encryptPassword(originalPass);
    const decrypted = decryptPassword(encrypted);
    expect(originalPass).toBe(decrypted);
  });

  it('encrypted string should be different than original string', () => {
    const originalPass = 'TestPassword';
    const encrypted = encryptPassword(originalPass);
    expect(encrypted === originalPass).toBe(false);
  });
});

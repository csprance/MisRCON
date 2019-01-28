import * as crypto from 'crypto';

export default class Cryptr {
  private readonly key: Buffer;
  private readonly algorithm: string;

  constructor(secret: string) {
    this.key = crypto
      .createHash('sha256')
      .update(String(secret))
      .digest();
    this.algorithm = 'aes-256-ctr';
  }

  public encrypt = (value: string) => {
    if (value == null) {
      throw new Error('value must not be null or undefined');
    }

    const iv = crypto
      .randomBytes(16)
      .toString('hex')
      .slice(0, 16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    const encrypted =
      cipher.update(String(value), 'utf8', 'hex') + cipher.final('hex');

    return iv + encrypted;
  };

  public decrypt = (value: string) => {
    if (value == null) {
      throw new Error('value must not be null or undefined');
    }

    const stringValue = String(value);
    const iv = stringValue.slice(0, 16);
    const encrypted = stringValue.slice(16);

    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
  };
}

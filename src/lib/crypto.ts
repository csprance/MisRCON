/*
FIXME: Yes I realize this sucks. Please guide me?
 */
import { CRYPTO_SALT } from '../constants/env';
import Cryptr from './cryptr';

const cryptr = new Cryptr(CRYPTO_SALT);

export const encryptPassword = (password: string): string =>
  cryptr.encrypt(password);

export const decryptPassword = (hash: string): string => cryptr.decrypt(hash);

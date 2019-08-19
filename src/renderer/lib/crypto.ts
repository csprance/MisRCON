/*
FIXME: Yes I realize this sucks. Please guide me?
 */
import { salt } from '../constants/env';
import Cryptr from './cryptr';

const cryptr = new Cryptr(salt);

export const encryptPassword = (password: string): string =>
  cryptr.encrypt(password);

export const decryptPassword = (hash: string): string => cryptr.decrypt(hash);

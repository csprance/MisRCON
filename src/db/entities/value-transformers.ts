// { from(value: DatabaseType): EntityType, to(value: EntityType): DatabaseType }
import { decryptPassword, encryptPassword } from '../../lib/crypto';
import { Dispatch } from '../../redux/redux-types';

export const jsonTransformer = {
  from: (value: string): number[] => {
    try {
      return JSON.parse(value);
    } catch (e) {
      return [];
    }
  },
  to: (value: number[]): string => JSON.stringify(value)
};

// { from(value: DatabaseType): EntityType, to(value: EntityType): DatabaseType }
export const functionTransformer = {
  from: (value: string): Dispatch => {
    return eval(value); // tslint:disable-line
  },
  to: (value: Dispatch): string => value.toString()
};

export const passwordTransformer = {
  from: (hash: string): string => decryptPassword(hash),
  to: (password: string): string => encryptPassword(password)
};

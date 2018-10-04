import { Dispatch } from 'redux';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { IRootState } from '../index';
import { addToDb } from './rcon-helpers';
import { Todo } from './rcon-types';

export const sendRCON = createAsyncAction(
  'rcon/REQUEST',
  'rcon/SUCCESS',
  'rcon/FAILED'
)<void, any[], string>();

export const sendRCONFlow = async (
  todo: Todo,
  dispatch: Dispatch<IRootState>
): Promise<any> => {
  // Tell Redux were requesting data from the db
  dispatch(sendRCON.request());
  try {
    // Do the actual request
    const results = await addToDb(todo);
    dispatch(sendRCON.success(results));
    return results;
  } catch (err) {
    // Catch the err
    sendRCON.failure(err.toString());
  }
};

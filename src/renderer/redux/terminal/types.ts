import {
  IHistoryStack,
  OutputRecordType
} from 'async-javascript-terminal/src/types';
import { List } from 'immutable';
import { ActionType } from 'typesafe-actions';

import { actions } from './index';

export interface Terminal {
  serverId: number; // The Id of the server
  outputs: List<OutputRecordType>;
  history: IHistoryStack;
  input: string;
}

export type State = Terminal[];

export type TerminalActions = ActionType<typeof actions>;

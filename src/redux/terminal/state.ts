import {
  makeDefaultHistory,
  makeDefaultOutputs
} from '../../components/RCONTerminal/defaults';
import { State, Terminal } from './types';

export const defaultState: State = [];
export const defaultTerminal: Terminal = {
  serverId: -1, // The Id of the server
  outputs: makeDefaultOutputs(),
  history: makeDefaultHistory(),
  input: ''
};
export default defaultState;

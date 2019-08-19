import { OutputRecordType } from 'async-javascript-terminal/src/types';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { AsyncThunkResult } from '../redux-types';
import { serversSelector } from '../servers/selectors';

/*
Scans all servers added to see if the terminal history has been added.
 */
export const scanForTerminals = createAsyncAction(
  'terminal/SCAN_REQUEST',
  'terminal/SCAN_SUCCESS',
  'terminal/SCAN_FAILURE'
)<void, number[], string>();
export const scanForTerminalsThunk = (): AsyncThunkResult<void> => async (
  dispatch,
  getState
) => {
  dispatch(scanForTerminals.request());
  const termIds: number[] = getState().terminal.map(term => term.serverId);
  const serverIds = serversSelector(getState()).map(server => server.id);
  const newTerminalIds: number[] = serverIds.filter(
    id => !termIds.includes(id)
  );
  try {
    dispatch(scanForTerminals.success(newTerminalIds));
  } catch (e) {
    dispatch(scanForTerminals.failure(e.toString()));
  }
};

export const addOutput = createAction(
  'terminal/ADD_OUTPUT',
  resolve => (output: OutputRecordType, serverId: number) =>
    resolve({ output, serverId })
);

export const addInput = createAction(
  'terminal/ADD_INPUT',
  resolve => (input: string, serverId: number) => resolve({ input, serverId })
);
export const deleteAllTerminals = createAction(
  'terminal/DELETE_TERMINALS'
);

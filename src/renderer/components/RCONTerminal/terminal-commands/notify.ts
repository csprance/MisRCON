import { EmulatorState, OutputFactory } from 'async-javascript-terminal';

import {
  addError,
  addInfo,
  addSuccess
} from '../../../redux/notifications/actions';
import { Dispatch, GetStateFunc } from '../../../redux/redux-types';

export default (dispatch: Dispatch, _getState: GetStateFunc) => ({
  function: async (_emulatorState: EmulatorState, opts: string[]) => {
    if (opts[0] === 'error') {
      console.log('Error');
      dispatch(addError('ERROR'));
    }
    if (opts[0] === 'info') {
      console.log('info');
      dispatch(addInfo('INFO'));
    }
    if (opts[0] === 'success') {
      console.log('success');
      dispatch(addSuccess('SUCCESS'));
    }
    return {
      output: OutputFactory.makeTextOutput('Sent')
    };
  },
  optDef: {},
  help: 'Quit the application.'
});

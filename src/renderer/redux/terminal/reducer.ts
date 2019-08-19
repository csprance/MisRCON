import { Stack } from 'immutable';
import { getType } from 'typesafe-actions';

import { makeDefaultOutputs } from '../../components/RCONTerminal/defaults';
import { Types, actions } from './index';

export default (
  state: Types.State = [],
  action: Types.TerminalActions
): Types.State => {
  switch (action.type) {
    // addOutput
    case getType(actions.addOutput):
      return [
        ...state.map(term => {
          if (term.serverId === action.payload.serverId) {
            return {
              ...term,
              outputs: action.payload.output
            };
          }
          return term;
        })
      ];

    // addInput
    case getType(actions.addInput):
      return [
        ...state.map(term => {
          if (term.serverId === action.payload.serverId) {
            return {
              ...term,
              input: action.payload.input
            };
          }
          return term;
        })
      ];

    // scanForTerminals
    case getType(actions.scanForTerminals.success):
      return [
        ...state,
        ...action.payload.map(termId => ({
          serverId: termId,
          outputs: makeDefaultOutputs(),
          history: Stack(['NOTUSED']),
          input: ''
        }))
      ];

    // deleteAllTerminals
    case getType(actions.deleteAllTerminals):
      return [];
    default:
      return state;
  }
};

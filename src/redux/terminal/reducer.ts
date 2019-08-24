import { getType } from 'typesafe-actions';

import {
  makeDefaultHistory,
  makeDefaultOutputs
} from '../../components/RCONTerminal/defaults';
import { actions, Types } from './index';

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

    // addHistory
    case getType(actions.addHistory):
      const { serverId, commandStr } = action.payload;

      return state.map(term => ({
        ...term,
        history:
          term.serverId === serverId
            ? [commandStr,...term.history]
            : term.history
      }));

    // scanForTerminals
    case getType(actions.scanForTerminals.success):
      return [
        ...state,
        ...action.payload.map(termId => ({
          serverId: termId,
          outputs: makeDefaultOutputs(),
          history: makeDefaultHistory(),
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

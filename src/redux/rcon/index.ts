import { ActionType, getType } from 'typesafe-actions';
import * as rconActions from './rcon-actions';
import { default as defaultState } from './rcon-state';
import { RconState as _RconState } from './rcon-types';

export type RconState = _RconState;
export type RconActions = ActionType<typeof rconActions>;

export const reducer = (
  state: RconState = defaultState,
  action: RconActions
): RconState => {
  switch (action.type) {
    case getType(rconActions.addTodo.request):
      return state;
    default:
      return state;
  }
};

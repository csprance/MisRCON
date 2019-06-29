import { ActionType, getType } from 'typesafe-actions';

import * as selfHostedActions from './actions';
import { SelfHostedState } from './index';
import { default as defaultState } from './state';

export type SelfHostedActions = ActionType<typeof selfHostedActions>;

export default (
  state: SelfHostedState = defaultState,
  action: SelfHostedActions
): SelfHostedState => {
  switch (action.type) {
    case getType(selfHostedActions.pollServerData.request):
      return { ...state };
    default:
      return state;
  }
};

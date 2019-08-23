import { getType } from 'typesafe-actions';

import * as selfHostedActions from './actions';
import { SelfHostedActions, SelfHostedState } from './index';
import { default as defaultState } from './state';

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

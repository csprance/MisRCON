import { getType } from 'typesafe-actions';

import { actions, Types } from './index';

export default (
  state: Types.State = [],
  action: Types.HostingActions
): Types.State => {
  switch (action.type) {
    default:
      return state;
  }
};

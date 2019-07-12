import { getType } from 'typesafe-actions';

import { actions, defaultNotificationsState, Types } from './index';
import { defaultNotification } from './state';

export default (
  state: Types.NotificationsState = defaultNotificationsState,
  action: Types.NotificationsActions
): Types.NotificationsState => {
  switch (action.type) {
    // Info
    case getType(actions.addInfo):
      return [
        ...state,
        {
          ...defaultNotification,
          content: action.payload,
          variant: 'info',
          id: Date.now()
        }
      ];

    // Error
    case getType(actions.addError):
      return [
        ...state,
        {
          ...defaultNotification,
          content: action.payload,
          variant: 'error',
          id: Date.now()
        }
      ];

    // Success
    case getType(actions.addSuccess):
      return [
        ...state,
        {
          ...defaultNotification,
          content: action.payload,
          variant: 'success',
          id: Date.now()
        }
      ];

    case getType(actions.closeNotification):
      return state.map(notification => ({ ...notification, open: false }));

    default:
      return state;
  }
};

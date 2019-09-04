import { createReducer } from 'typesafe-actions';

import { actions } from './index';
import { defaultNotification, defaultNotificationsState } from './state';

export default createReducer(defaultNotificationsState)
  .handleAction(actions.addInfo, (state, action) => [
    ...state,
    {
      ...defaultNotification,
      content: action.payload,
      variant: 'info',
      id: Date.now()
    }
  ])
  .handleAction(actions.addError, (state, action) => [
    ...state,
    {
      ...defaultNotification,
      content: action.payload,
      variant: 'error',
      id: Date.now()
    }
  ])
  .handleAction(actions.addSuccess, (state, action) => [
    ...state,
    {
      ...defaultNotification,
      content: action.payload,
      variant: 'success',
      id: Date.now()
    }
  ])
  .handleAction(actions.closeNotification, (state, action) =>
    state.map(notification => ({
      ...notification,
      open: action.payload === notification.id ? false : notification.open
    }))
  );

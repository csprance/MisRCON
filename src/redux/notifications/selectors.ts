import { createSelector } from 'reselect';

import { RootState } from '../redux-types';

export const notificationsSelector = (state: RootState, _props?: any) =>
  state.notifications;

export const showingNotificationsSelectors = createSelector(
  notificationsSelector,
  notifications => notifications.filter(n => n.open)
);

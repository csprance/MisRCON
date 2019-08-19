import { ActionType } from 'typesafe-actions';

import { actions } from './index';

export interface Notification {
  id: number; // Usually just Date.now()
  variant: 'error' | 'info' | 'success' | 'warning'; // What kind of notification variant
  open: boolean; // Is the notification currently displaying
  serverID: number; // What server is this notification for
  content: string; // The content of the notification
}

export type NotificationsState = Notification[];

export type NotificationsActions = ActionType<typeof actions>;

import { Notification, NotificationsState } from './types';

export const defaultNotification: Notification = {
  id: 0,
  open: true,
  variant: 'error',
  serverID: -1,
  content: 'Content'
};

export const defaultNotificationsState: NotificationsState = [
  // defaultNotification
];

export default defaultNotificationsState;

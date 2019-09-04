import { Notification, NotificationsState } from './types';

export const defaultNotification: Notification = {
  id: 0,
  open: true,
  variant: 'error',
  serverID: -1,
  content: 'Content'
};

export const defaultNotificationsState: NotificationsState = [
  // defaultNotification,
  // {...defaultNotification, id: 1, content: 'info'},
  // {...defaultNotification, id: 2, content: 'success'}
];

export default defaultNotificationsState;

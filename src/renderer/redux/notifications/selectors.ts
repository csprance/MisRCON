import { RootState } from '../redux-types';

export const notificationsSelector = (state: RootState, _props?: any) =>
  state.notifications;

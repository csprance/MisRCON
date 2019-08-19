import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import reducer from './reducer';
import defaultNotificationsState from './state';
import * as Types from './types';

type NotificationsActions = ActionType<typeof actions>;

export default reducer;
export { actions, defaultNotificationsState, NotificationsActions, Types };

import { AnyAction, Dispatch as ReduxDispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StateType } from 'typesafe-actions';

import { AppActions } from './app';
import { HostingActions } from './hosting/types';
import { rootReducer } from './index';
import { MisMapActions } from './mismap';
import { NotificationsActions } from './notifications';
import { PlayersActions } from './players';
import { RCONActions } from './rcon';
import { ServersActions } from './servers';
import { TasksActions } from './tasks';
import { TerminalActions } from './terminal/types';

export interface RootState extends StateType<typeof rootReducer> {}

export type RootAction =
  | HostingActions
  | NotificationsActions
  | MisMapActions
  | PlayersActions
  | RCONActions
  | ServersActions
  | AppActions
  | TerminalActions
  | TasksActions;

export type AsyncThunkResult<R> = ThunkAction<
  Promise<R>,
  RootState,
  {},
  AnyAction
>;
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, AnyAction>;

export type Dispatch = ThunkDispatch<RootState, any, RootAction> &
  ReduxDispatch<RootAction>;

export type GetStateFunc = () => RootState;

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}

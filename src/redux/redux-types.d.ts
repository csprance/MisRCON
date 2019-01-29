import { AnyAction, Dispatch as ReduxDispatch, Store } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StateType } from 'typesafe-actions';

import { AppActions } from './app';
import { rootReducer } from './index';
import { MisMapActions } from './mismap';
import { PlayersActions } from './players';
import { RCONActions } from './rcon';
import { ServersActions } from './servers';
import { TasksActions } from './tasks';

export interface RootState extends StateType<typeof rootReducer> {}

export type RootAction =
  | MisMapActions
  | PlayersActions
  | RCONActions
  | ServersActions
  | AppActions
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

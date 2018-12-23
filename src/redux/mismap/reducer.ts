import { ActionType, getType } from 'typesafe-actions';
import * as misMapActions from './actions';
import { default as defaultState } from './state';
import { MisMapState } from './types';

export type MisMapActions = ActionType<typeof misMapActions>;

export default (
  state: MisMapState = defaultState,
  action: MisMapActions
): MisMapState => {
  switch (action.type) {
    case getType(misMapActions.hydrateFromDb.success):
      return { ...action.payload };
    case getType(misMapActions.addMarker.success):
      return { ...action.payload };
    default:
      return state;
  }
};

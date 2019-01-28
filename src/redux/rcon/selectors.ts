import { createSelector } from 'reselect';
import { RootState } from '../redux-types';

const rconSelector = (state: RootState, _props?: any) => state.rcon;

const rconRequestsSelector = createSelector(
  rconSelector,
  rcon => rcon.requests
);

export const failedRconRequestsSelector = createSelector(
  rconRequestsSelector,
  requests => requests.filter(request => !request.completed)
);

export const completedRconRequestsSelector = createSelector(
  rconRequestsSelector,
  requests => requests.filter(request => request.completed)
);

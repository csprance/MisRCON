import { StatusResponse } from 'node-misrcon';
import { createSelector } from 'reselect';
import { RootState } from '../redux-types';
import { ipPortPropsSelector } from '../selectors';

export const rconSelector = (state: RootState, _props?: any) => state.rcon;

export const sendingSelector = createSelector(
  rconSelector,
  rcon => rcon.sending
);

export const rconRequestsSelector = (state: RootState, _props?: any) =>
  state.rcon.requests;

export const failedRconRequestsSelector = createSelector(
  rconRequestsSelector,
  requests => requests.filter(request => !request.completed)
);

export const rconHistorySelector = createSelector(
  rconRequestsSelector,
  requests =>
    requests.filter(request => !request.completed).map(req => req.command)
);

export const completedRconRequestsSelector = createSelector(
  rconRequestsSelector,
  requests => requests.filter(request => request.completed)
);

export const latestCompletedRequestByServerIpPortSelector = createSelector(
  completedRconRequestsSelector,
  ipPortPropsSelector,
  (completedRequests, { ip, port }) =>
    completedRequests
      .filter(request => request.ip === ip && request.port === port)
      .sort((a, b) => b.date - a.date)
);

export const latestRCONStatusByServerIpPortSelector = createSelector(
  latestCompletedRequestByServerIpPortSelector,
  (requests): StatusResponse | null => {
    const [statusResponse] = requests.filter(req =>
      req.parsedResponse ? req.parsedResponse.type === 'status' : false
    );
    if (!statusResponse) {
      return null;
    }
    const { parsedResponse } = statusResponse;
    if (parsedResponse) {
      if (parsedResponse.type === 'status') {
        return parsedResponse.data as any; // FIXME: Not sure why this happens
      }
    }
    return null;
  }
);

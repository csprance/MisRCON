import { createSelector } from 'reselect';

import { RootState } from '../redux-types';
import { activeServerSelector } from '../servers/selectors';
import { defaultHost } from './state';

export const hostingSelector = (state: RootState, _props?: any) =>
  state.hosting;

export const activeServerHostingSelector = createSelector(
  hostingSelector,
  activeServerSelector,
  (hosting, activeServer) => {
    const host = hosting.find(h => h.id === activeServer.id);
    return host ? host : defaultHost;
  }
);

export const activeServerHostingDiffSelector = createSelector(
  activeServerHostingSelector,
  activeServer => activeServer.diff
);

export const activeServerHostingPathSelector = createSelector(
  activeServerHostingSelector,
  activeServer => activeServer.hostingPath
);

export const activeServerHostingTextSelector = createSelector(
  activeServerHostingSelector,
  activeServer => activeServer.hostingText
);

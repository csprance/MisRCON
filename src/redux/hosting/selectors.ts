import { createSelector } from 'reselect';

import { RootState } from '../redux-types';

export const hostingSelector = (state: RootState, _props?: any) => state.hosting;


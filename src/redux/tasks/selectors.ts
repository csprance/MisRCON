import { createSelector } from 'reselect';

import { RootState } from '../redux-types';

export const tasksSelector = (state: RootState, _props?: any) => state.tasks;

export const activeTasksSelector = createSelector(
  tasksSelector,
  tasks => tasks.filter(task => task.active)
);

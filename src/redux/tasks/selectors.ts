import { createSelector } from 'reselect';
import { RootState } from '../redux-types';
import { activeServerSelector } from '../servers/selectors';

export const tasksSelector = (state: RootState, _props?: any) => state.tasks;

export const makeTaskByIDSelector = (id: number) =>
  createSelector(
    tasksSelector,
    tasks => tasks.find(task => task.id === id)
  );

export const activeTasksSelector = createSelector(
  tasksSelector,
  tasks => tasks.filter(task => task.active)
);

export const inActiveTasksSelector = createSelector(
  tasksSelector,
  tasks => tasks.filter(task => !task.active)
);

export const activeTasksForActiveServer = createSelector(
  activeTasksSelector,
  activeServerSelector,
  (activeTasks, activeServer) =>
    activeTasks.filter(task => task.serverId === activeServer.id)
);

export const inActiveTasksForActiveServer = createSelector(
  inActiveTasksSelector,
  activeServerSelector,
  (inActiveTasks, activeServer) =>
    inActiveTasks.filter(task => task.serverId === activeServer.id)
);

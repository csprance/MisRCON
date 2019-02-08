import { createSelector } from 'reselect';
import { RootState } from '../redux-types';
import {
  activeServerIDSelector,
  activeServerSelector
} from '../servers/selectors';
import { Task } from './types';

export const tasksSelector = (state: RootState, _props?: any) => state.tasks;

export const propsIdSelector = (_state: RootState, props: { id: number }) =>
  props.id;

export const taskByIdSelector = createSelector(
  tasksSelector,
  propsIdSelector,
  (tasks, id) => tasks.find(task => task.id === id)
);

export const tasksByServerIdSelector = createSelector(
  tasksSelector,
  propsIdSelector,
  (tasks, id) => tasks.filter(task => task.serverId === id)
);

export const makeTaskByIDSelector = () => taskByIdSelector;

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

export const allTasksOnActiveServer = createSelector(
  tasksSelector,
  activeServerIDSelector,
  (tasks, id) => tasks.filter(task => task.serverId === id)
);

/*
Finds a Task by a partial
 */
export const makeTaskByPartialSelector = (partial: Partial<Task>) =>
  createSelector(
    tasksSelector,
    players => {
      const [key] = Object.keys(partial);
      const value = partial[key];
      return players.find(player => player[key] === value);
    }
  );

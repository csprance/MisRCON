import { createSelector } from 'reselect';

import { RootState } from '../redux-types';
import { activeServerSelector } from '../servers/selectors';

export const terminalSelector = (state: RootState, _props?: any) =>
  state.terminal;

export const propsIdSelector = (_state: RootState, props: { id: number }) =>
  props.id;

export const terminalByIdSelector = createSelector(
  terminalSelector,
  propsIdSelector,
  (terminals, id) => {
    return terminals.filter(term => term.serverId === id);
  }
);

export const activeTerminalSelector = createSelector(
  activeServerSelector,
  terminalSelector,
  (activeServer, terminals) => {
    return terminals.filter(term => term.serverId === activeServer.id);
  }
);

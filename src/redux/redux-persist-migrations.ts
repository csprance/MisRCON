import { defaultState } from './app';
import { RootState } from './redux-types';

export const migrations = {
  // When we added auto-update
  0: (state: RootState) => {
    return {
      ...state,
      app: {
        ...defaultState,
        updateNeeded: false,
        addServerDialogOpen: false
      }
    };
  },
  // When we added player location 3.0.1-rc-9
  1: (state: RootState) => {
    return {
      ...state,
      players: state.players.map(pl => ({ ...pl, location: 'xx' }))
    };
  }
};

export default migrations;

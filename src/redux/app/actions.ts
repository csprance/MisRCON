import { createAction } from 'typesafe-actions';

// Show/Hide the player profile dialog
export const togglePlayerProfileDialog = createAction(
  'app/TOGGLE_PLAYER_PROFILE'
);

export const setPlayerActiveInPlayerProfile = createAction(
  'app/SET_PLAYER',
  resolve => (steam: string) => resolve(steam)
);

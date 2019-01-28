import { createAction } from 'typesafe-actions';

// Show/Hide the player profile dialog
export const togglePlayerProfileDialog = createAction(
  'ui/TOGGLE_PLAYER_PROFILE'
);

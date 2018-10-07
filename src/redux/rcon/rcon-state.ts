// The Default state for the db
import { RCONState } from './rcon-types';

export const rconState: RCONState = {
  sending: false,
  requests: []
};
export default rconState;

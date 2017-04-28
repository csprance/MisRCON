/**
 * Name: rconActions
 * Created by chris on 4/27/2017.
 * Description:
 */
import * as actionType from '../constants/ActionTypes';


export function sendRCONCommandToServer(command) {
  return {
    type: actionType.SEND_RCON_COMMAND,
    payload: command
  };
}

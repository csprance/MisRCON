/**
 * Name: rconReducer
 * Created by chris on 4/27/2017.
 * Description:
 */
import * as actionType from '../constants/ActionTypes';


const initialState = {
  ip: '',
  port: '',
  password: '',
  command: '',
  response: '',
  parsedResponse: '',
};

export default function rcon(state = initialState, action) {
  switch (action.type) {
    case actionType.SEND_RCON_COMMAND:
      return {...state, command: action.payload};
    case actionType.RECEIVE_RCON_RESPONSE:
      return {...state, response: action.payload};
    default:
      return state;
  }
}

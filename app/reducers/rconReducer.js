/**
 * Name: rconReducer
 * Created by chris on 4/27/2017.
 * Description:
 */
import * as actionType from '../constants/ActionTypes';


const initialState = {
  pending: false,
  command: '',
  response: ''
};

export default function rcon(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_RCON_COMMAND:
      return {...state, command: action.payload};
    case actionType.SEND_RCON_COMMAND_PENDING:
      return {...state, pending: true};
    case actionType.SEND_RCON_COMMAND_RECEIVED:
      return {...state, response: action.payload, pending: false};
    default:
      return state;
  }
}

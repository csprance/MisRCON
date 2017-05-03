/**
 * Name: eventLogReducer
 * Created by chris on 3/17/2017.
 * Description:
 */
// TODO: Store these credentials better somehow
import * as types from '../constants/ActionTypes';


const initialState = {
  chatLogPath: '',
  damageLogPath: '',
  chatLogs: [{
    type: 'chat',
    time: '',
    steam: '',
    name: '',
    ip: '',
    msg: '',
  }],
  damageLogs: [{
    type: 'damage',
    time: '',
    steam: '',
    name: '',
    targetSteam: '',
    targetName: '',
    weapon: '',
    distance: '',
    damage: '',
    melee: '',
    headshot: '',
    kill: '',
    part: '',
    hitType: '',
    projectile: '',
  }],
  parsing: false,
};

export default function credentials(state = initialState, action) {
  switch (action.type) {
    case types.PARSING_DAMAGE_LOGS: {
      return {...state, parsing: true};
    }
    case types.PARSED_DAMAGE_LOGS: {
      return {...state, damageLogs: action.payload, parsing: false};
    }
    case types.PARSING_CHAT_LOGS: {
      return {...state, parsing: true};
    }
    case types.PARSED_CHAT_LOGS: {
      return {...state, chatLogs: action.payload, parsing: false};
    }
    default:
      return state;
  }
}

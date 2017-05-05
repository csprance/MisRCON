/**
 * Name: eventLogReducer
 * Created by chris on 3/17/2017.
 * Description:
 */
import * as types from '../constants/ActionTypes';

// contains info about the player
const player = {
    steam: '76561198064851703',
    name: 'Load Logs to Show Events',
    avatar: 'http://placehold.it/42x42',
    lastUpdate: Date.now(),
    lastMsg: 'to show events',
  },
  // a player chat log
  chatEvent = {
    id: 21542,
    date: '12-14-2016-10:31.042',
    name: 'Load Logs',
    steam: '76561198064851703',
    ip: '192.168.1.2',
    msg: 'To Show events',
  },
  // an emitter damage log
  damageEvent = {
    id: 548318,
    date: '12-14-2016-11:54.047',
    shooterName: 'MarkBob',
    shooterSteam: '06060198064851703',
    targetName: '',
    targetSteam: '16161198064851703',
    weapon: 'Model70',
    distance: '2.56',
    damage: '53.21*1.00x=53.21',
    melee: '0',
    headShot: '0',
    kill: '1',
    part: '23(Bip01 Spine1)',
    hitType: 'ammo_223',
    projectile: 'ammo_223'
  },
  initialState = {
    chatLogPath: '',
    damageLogPath: '',
    emitters: [player],
    chatLogs: [chatEvent],
    damageLogs: [damageEvent],
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

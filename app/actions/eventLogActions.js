/**
 * Name: eventLogActions
 * Created by chris on 5/3/2017.
 * Description:
 */
import Baby from 'babyparse';

import * as chatUtils from '../utils/chatLogUtils';
import * as damageUtils from '../utils/damageLogUtils';
import * as actionType from '../constants/ActionTypes';

// Damage Logs
export const loadDamageLog = (path) => {
  return dispatch => {
    dispatch(parsingDamageLog());
    // do stuff

    dispatch(parsedDamageLog());
  };
};

export function parsingDamageLog() {
  return {
    type: actionType.PARSING_DAMAGE_LOGS
  };
}

export function parsedDamageLog() {
  return {
    type: actionType.PARSED_DAMAGE_LOGS
  };
}


// Chat Logs
export const loadChatLog = (path) => {
  return dispatch => {
    dispatch(parsingChatLog());
    // do stuff

    dispatch(parsedChatLog());
  };
};
export function parsingChatLog() {
  return {
    type: actionType.PARSING_CHAT_LOGS
  };
}
export function parsedChatLog() {
  return {
    type: actionType.PARSED_CHAT_LOGS
  };
}

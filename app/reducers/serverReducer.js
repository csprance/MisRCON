/**
 * Name: serverReducer
 * Created by chris on 3/17/2017.
 * Description:
 */
import * as actionType from '../constants/ActionTypes';

const initialState = {
  loading: false,
  status: {
    name: '',
    ip: '',
    version: '',
    level: '',
    gameRules: '',
    time: '',
    players: '',
    playersArray: []
  },
  whitelist: [],
  banlist: []
};

export default function server(state = initialState, action) {
  switch (action.type) {
    case actionType.FETCHING_SERVER_BANLIST:
      return { ...state, loading: true };
    case actionType.FETCHING_FAIL:
      return { ...state, loading: false };
    case actionType.FETCHING_SERVER_WHITELIST:
      return { ...state, loading: true };
    case actionType.FETCHING_ALL_SERVER_DATA:
      return { ...state, loading: true };
    case actionType.FETCHING_SERVER_STATUS:
      return { ...state, loading: true };
    case actionType.UPDATE_SERVER_STATUS:
      return { ...state, status: action.payload, loading: false };
    case actionType.UPDATE_SERVER_WHITELIST:
      return { ...state, whitelist: action.payload, loading: false };
    case actionType.UPDATE_SERVER_BANLIST:
      return { ...state, banlist: action.payload, loading: false };
    case actionType.UPDATE_ALL_SERVER_DATA:
      return { ...action.payload, loading: false };
    default:
      return state;
  }
}

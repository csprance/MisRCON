/**
 * Name: ActionTypes
 * Created by chris on 4/27/2017.
 * Description:
 */


// RCON action types
export const SEND_RCON_COMMAND_PENDING = 'SEND_RCON_COMMAND_PENDING';
export const SEND_RCON_COMMAND_RECEIVED = 'SEND_RCON_COMMAND_RECEIVED';
export const SET_RCON_COMMAND = 'SET_RCON_COMMAND';


// Notification system - notify
export const EMIT_INFO = 'EMIT_INFO';
export const EMIT_WARN = 'EMIT_WARN';
export const EMIT_ERROR = 'EMIT_ERROR';
export const DISMISS_NOTIFY = 'EMIT_ERROR';


// Credentials
export const ADD_CREDENTIALS = 'ADD_CREDENTIALS';
export const REMOVE_CREDENTIALS = 'REMOVE_CREDENTIALS';
export const USE_CREDENTIALS = 'USE_CREDENTIALS';


// Server  - Contains all the info on the current server
export const UPDATE_SERVER_STATUS = 'UPDATE_SERVER_STATUS';
export const UPDATE_SERVER_WHITELIST = 'UPDATE_SERVER_WHITELIST';
export const UPDATE_SERVER_BANLIST = 'UPDATE_SERVER_BANLIST';

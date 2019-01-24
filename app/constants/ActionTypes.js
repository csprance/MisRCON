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
export const DISMISS_NOTIFY = 'DISMISS_NOTIFY';

// Credentials
export const ADD_CREDENTIALS = 'ADD_CREDENTIALS';
export const REMOVE_CREDENTIALS = 'REMOVE_CREDENTIALS';
export const USE_CREDENTIALS = 'USE_CREDENTIALS';
export const LOG_OUT = 'LOG_OUT';

// Server  - Contains all the info on the current server
export const UPDATE_SERVER_STATUS = 'UPDATE_SERVER_STATUS';
export const FETCHING_SERVER_STATUS = 'FETCHING_SERVER_STATUS';
export const UPDATE_SERVER_WHITELIST = 'UPDATE_SERVER_WHITELIST';
export const FETCHING_SERVER_WHITELIST = 'FETCHING_SERVER_WHITELIST';
export const UPDATE_SERVER_BANLIST = 'UPDATE_SERVER_BANLIST';
export const FETCHING_SERVER_BANLIST = 'FETCHING_SERVER_BANLIST';
export const UPDATE_ALL_SERVER_DATA = 'UPDATE_ALL_SERVER_DATA';
export const FETCHING_ALL_SERVER_DATA = 'FETCHING_ALL_SERVER_DATA';
export const FETCHING_FAIL = 'FETCHING_FAIL';

// Damage Logs
export const PARSING_DAMAGE_LOGS = 'PARSING_DAMAGE_LOGS';
export const PARSED_DAMAGE_LOGS = 'PARSED_DAMAGE_LOGS';

// chat Logs
export const PARSING_CHAT_LOGS = 'PARSING_CHAT_LOGS';
export const PARSED_CHAT_LOGS = 'PARSED_CHAT_LOGS';

// Scheduled Tasks
export const SHOW_TASK_DIALOG = 'SHOW_TASK_DIALOG';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const INCREMENT_TASK = 'INCREMENT_TASK';
export const TASKS_LOADED = 'TASKS_LOADED';
export const TOGGLE_TASK_LIST = 'TOGGLE_TASK_LIST';

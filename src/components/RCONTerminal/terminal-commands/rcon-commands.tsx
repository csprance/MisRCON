import { EmulatorState, OutputFactory } from 'async-javascript-terminal';

import { rconActions } from '../../../redux/rcon';
import { makeRCONRequestObject } from '../../../redux/rcon/utils';
import { Dispatch } from '../../../redux/redux-types';

const makeRconFunc = (command: string, dispatch: Dispatch) => async (
  state: EmulatorState,
  opts: string[]
) => {
  try {
    const env = state.getEnvVariables();

    const request = makeRCONRequestObject(
      env.get('ip'),
      env.get('port'),
      env.get('password'),
      [command === 'default' ? null : command, ...opts].join(' ').trim()
    );
    const { response } = await dispatch(rconActions.sendRCONAsyncThunk(request));
    return {
      output: OutputFactory.makeTextOutput(response)
    };
  } catch (e) {
    return {
      output: OutputFactory.makeTextOutput(e.toString())
    };
  }
};

const makeCommand = (command: string, help: string, dispatch: Dispatch) => ({
  function: makeRconFunc(command, dispatch),
  optDef: {},
  help
});

export default (dispatch: Dispatch) =>
  [
    ['sv_servername', 'Name of server in quotes'],
    ['wm_timeScale', '3 How Fast time moves'],
    ['wm_forceTime', '-1 Force a current time'],
    ['g_pinglimit', '0 Ping required to join'],
    ['g_pingLimitTimer', '15 How long ping bad before kick'],
    [
      'g_idleKickTime',
      '300 How long idle before kick - Does not Work! Waiting on bug-fix'
    ],
    [
      'g_gameRules_Camera',
      '0 Server enforced camera rules,0=both, 1=fp only, 2=tp only in vehicle'
    ],
    ['mis_ban_steamid', '64BITSTEAMID Ban Player'],
    ['mis_ban_status', 'Get Ban List'],
    ['mis_ban_remove', '64BITSTEAMID Remove from ban list'],
    ['mis_kick', '64BITSTEAMID Kick from server'],
    ['mis_whitelist_add', '64BITSTEAMID Add to whitelist'],
    ['mis_whitelist_remove', '64BITSTEAMID remove from whitelist'],
    ['mis_whitelist_status', 'Get Whitelist'],
    ['status', 'Get server status'],
    ['sv_say', 'Send a message'],
    ['sv_motd', 'Set the message of the day for the server'],
    ['sv_url', 'Set the URL for the servers website'],
    ['sv_chat', 'Send a message via the chat window'],
    [
      'do_shutdown',
      'SECONDS Do a restart with announcements in x seconds (default: 60 seconds, min: 45 seconds, max: 600 seconds)'
    ],
    ['default', 'Send an RCON Command']
  ].reduce((acc, helpString) => {
    acc[helpString[0]] = makeCommand(helpString[0], helpString[1], dispatch);
    return acc;
  }, {});

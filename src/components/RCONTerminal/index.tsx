import {
  Emulator,
  EmulatorState,
  EnvironmentVariables,
  History
} from 'async-javascript-terminal';
import { List } from 'immutable';
import * as React from 'react';

import { Dispatch } from '../../redux/redux-types';
import { Server } from '../../redux/servers';
import { Terminal } from '../../redux/terminal/types';
import ReactTerminal from './react-terminal-component';
import makeTerminalCommands from './terminal-commands';

type Props = {
  activeTerminal: Terminal;
  activeServer: Server;
  dispatch: Dispatch;
  rconHistory: () => string[];
};
const RCONTerminal: React.FunctionComponent<Props> = ({
  activeTerminal,
  activeServer,
  dispatch,
  rconHistory
}) => {
  return (
    <ReactTerminal
      key={activeServer.id}
      activeServer={activeServer}
      inputStr={activeTerminal ? activeTerminal.input : ''}
      dispatch={dispatch}
      emulator={new Emulator()}
      emulatorState={EmulatorState.create({
        history: History.create(rconHistory()),
        environmentVariables: EnvironmentVariables.create({
          serverId: activeServer.id,
          password: activeServer.password,
          ip: activeServer.ip,
          port: activeServer.port
        }),
        outputs: activeTerminal ? activeTerminal.outputs : List(),
        commandMapping: makeTerminalCommands(dispatch, dispatch((_, gs) => gs))
      })}
    />
  );
};

export default RCONTerminal;

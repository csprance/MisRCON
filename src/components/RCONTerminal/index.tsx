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
import themes from './react-terminal-component/themes';
import makeTerminalCommands from './terminal-commands';

interface Props {
  themeName: string;
  activeTerminal: Terminal;
  activeServer: Server;
  dispatch: Dispatch;
  history: string[];
}
const RCONTerminal: React.FunctionComponent<Props> = ({
  activeTerminal,
  activeServer,
  dispatch,
  history,
  themeName
}) => {
  return (
    <ReactTerminal
      theme={themes[themeName]}
      key={activeServer.id}
      activeServer={activeServer}
      inputStr={activeTerminal ? activeTerminal.input : ''}
      dispatch={dispatch}
      emulator={new Emulator()}
      emulatorState={EmulatorState.create({
        history: History.create(history),
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

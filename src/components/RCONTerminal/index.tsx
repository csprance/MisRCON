import {
  Emulator,
  EmulatorState,
  EnvironmentVariables,
  History,
  OutputFactory,
  Outputs
} from 'async-javascript-terminal';
import * as React from 'react';

import * as npmPackage from '../../../package.json';
import ReactTerminal from './react-terminal-component';
import makeTerminalCommands from './terminal-commands';

import { Dispatch } from '../../redux/redux-types';
import { IServer } from '../../redux/servers';

type Props = {
  dispatch: Dispatch;
  activeServer: IServer;
};
type State = {
  emulator: Emulator;
  terminalState: EmulatorState;
};
class RCONTerminal extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {
    emulator: new Emulator(),
    terminalState: EmulatorState.create({
      history: History.create(['server --ls', 'server --add --name test', 'task --ls']),
      environmentVariables: EnvironmentVariables.create({
        password: this.props.activeServer.hash,
        ip: this.props.activeServer.ip,
        port: this.props.activeServer.port
      }),
      outputs: Outputs.create([
        OutputFactory.makeTextOutput(`MisRCON - V${npmPackage.version}`),
        OutputFactory.makeTextOutput(
          <span>
            Type any rcon command or{' '}
            <span style={{ color: 'orange' }}>help</span> for more options
          </span>
        ),
        OutputFactory.makeTextOutput('-----')
      ]),
      commandMapping: makeTerminalCommands(this.props.dispatch)
    })
  };

  public render() {
    const { terminalState } = this.state;
    return (
      <ReactTerminal
        emulator={this.state.emulator}
        emulatorState={terminalState}
      />
    );
  }
}

export default RCONTerminal;

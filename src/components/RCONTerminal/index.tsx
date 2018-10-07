import {
  Emulator,
  EmulatorState,
  EnvironmentVariables,
  OutputFactory,
  Outputs
} from 'async-javascript-terminal';
import * as React from 'react';

import * as npmPackage from '../../../package.json';
import ReactTerminal from './react-terminal-component';
import terminalCommands from './terminal-commands';

import { IRCONRequest } from '../../redux/rcon/rcon-types';
import { IServer } from '../../redux/servers/servers-types';

type Props = {
  sendRCON: () => Promise<IRCONRequest>;
  activeServer: IServer;
};
type State = {};
class RCONTerminal extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {
    emulator: new Emulator(),
    terminalState: EmulatorState.create({
      environmentVariables: EnvironmentVariables.create({
        password: this.props.activeServer.hash,
        ip: this.props.activeServer.ip,
        port: this.props.activeServer.port
      }),
      outputs: Outputs.create([
        OutputFactory.makeTextOutput(`MisRCON - V${npmPackage.version}`),
        OutputFactory.makeTextOutput('Type help for more options'),
        OutputFactory.makeTextOutput('-----')
      ]),
      commandMapping: terminalCommands
    })
  };

  public render() {
    const { terminalState } = this.state;
    return (
      <ReactTerminal
        inputStr={''}
        emulator={this.state.emulator}
        emulatorState={terminalState}
      />
    );
  }
}

export default RCONTerminal;

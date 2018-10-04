import {
  CommandMapping, Emulator,
  EmulatorState,
  OutputFactory,
  Outputs
} from 'async-javascript-terminal';
import axios from 'axios';
import * as React from 'react';

import ReactTerminal from './react-terminal-component';

type Props = {};
type State = {};
class RCONTerminal extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {
    emulator: new Emulator(),
    terminalState: EmulatorState.create({
      outputs: Outputs.create([
        OutputFactory.makeTextOutput('MisRCON - V3.0.0'),
        OutputFactory.makeTextOutput('Type help for more options'),
        OutputFactory.makeTextOutput('-----')
      ]),
      commandMapping: CommandMapping.create({
        default: {
          function: async (state: any, opts: any) => {
            return {
              output: OutputFactory.makeTextOutput('Server Response')
            };
          },
          optDef: {}
        },
        chuck: {
          function: async () => {
            const { data } = await axios.get(
              'https://api.chucknorris.io/jokes/random'
            );
            console.log(data);

            return {
              output: OutputFactory.makeTextOutput(<div>
                <img src={data.icon_url} alt=""/>
                {data.value}
              </div>)
            };
          },
          optDef: {}
        },
        help: {
          function: async () => {
            return {
              output: OutputFactory.makeTextOutput('Help String')
            };
          },
          optDef: {}
        }
      })
    })
  };

  public render() {
    const { terminalState } = this.state;
    return <ReactTerminal emulator={this.state.emulator} emulatorState={terminalState} />;
  }
}

export default RCONTerminal;

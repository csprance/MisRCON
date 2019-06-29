import {
  Emulator,
  EmulatorState,
  HistoryKeyboardPlugin,
  OutputType
} from 'async-javascript-terminal';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { Dispatch } from '../../../redux/redux-types';
import { Server } from '../../../redux/servers';
import { addInput, addOutput } from '../../../redux/terminal/actions';
import CommandInput from './input/CommandInput';
import HeaderOutput from './output/HeaderOutput';
import TextErrorOutput from './output/TextErrorOutput';
import TextOutput from './output/TextOutput';
import OutputList from './OutputList';
import TerminalContainer from './TerminalContainer';
import defaultTheme from './themes/default';

type State = {
  emulatorState: EmulatorState;
  inputStr: string;
  disabled: boolean;
};
type Props = {
  activeServer: Server;
  dispatch: Dispatch;
  emulator: Emulator;
} & Partial<DefaultProps>;
type DefaultProps = Readonly<typeof defaultProps>;
const defaultProps = {
  emulatorState: EmulatorState.createEmpty(),
  theme: defaultTheme,
  promptSymbol: '🎮',
  outputRenderers: {
    [OutputType.TEXT_OUTPUT_TYPE]: TextOutput,
    [OutputType.TEXT_ERROR_OUTPUT_TYPE]: TextErrorOutput,
    [OutputType.HEADER_OUTPUT_TYPE]: HeaderOutput
  },
  inputStr: ''
};
class Terminal extends React.Component<Props, State> {
  static defaultProps = defaultProps;

  emulator: Emulator;
  historyKeyboardPlugin: HistoryKeyboardPlugin;
  plugins: any[];
  serverId: number;
  inputRef: any;

  constructor(props: Props) {
    super(props);
    this.emulator = this.props.emulator;
    this.historyKeyboardPlugin = new HistoryKeyboardPlugin(
      this.props.emulatorState! // Non-null assertion
    );
    this.plugins = [this.historyKeyboardPlugin];
    this.state = {
      disabled: false,
      emulatorState: this.props.emulatorState!, // Non-null assertion
      inputStr: this.props.inputStr! // Non-null assertion
    };
    this.serverId = this.state.emulatorState.getEnvVariables().get('serverId');

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.onInputKeyDownEvent = this.onInputKeyDownEvent.bind(this);
  }

  componentDidMount() {
    this.focusTerminal();
  }

  componentDidUpdate() {
    if (this.inputRef) {
      this.inputRef.scrollIntoView();
    }
  }

  async onInputSubmit(commandStr: string) {
    if (!this.state.disabled) {
      this.setState({
        disabled: true
      });

      const newState = await this.emulator.execute(
        this.state.emulatorState,
        commandStr,
        this.plugins
      );

      this.props.dispatch(addOutput(newState.getOutputs(), this.serverId));
      this.props.dispatch(addInput('', this.serverId));

      this.setState(({ emulatorState, ...rest }) => ({
        ...rest,
        inputStr: '',
        emulatorState: newState
      }));
      this.setState({
        disabled: false
      });
      this.inputRef.focus();
    }
  }

  onInputChange(e: any) {
    this.props.dispatch(addInput(e.target.value, this.serverId));
    this.setState(({ inputStr, ...rest }) => ({
      ...rest,
      inputStr: e.target.value
    }));
  }

  onInputKeyDownEvent(e: any) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();

        this.setState(({ inputStr, ...rest }) => ({
          ...rest,
          inputStr: this.historyKeyboardPlugin.completeUp()
        }));

        break;
      case 'ArrowDown':
        e.preventDefault();

        this.setState(({ inputStr, ...rest }) => ({
          ...rest,
          inputStr: this.historyKeyboardPlugin.completeDown()
        }));

        break;
      case 'Tab':
        e.preventDefault();

        const autoCompletedStr = this.emulator.autocomplete(
          this.state.emulatorState,
          this.state.inputStr
        );

        this.setState(({ inputStr, ...rest }) => ({
          ...rest,
          inputStr: autoCompletedStr
        }));

        break;
      default:
        break;
    }
  }

  focusTerminal = () => {
    this.inputRef.focus();
  };

  render() {
    const { disabled } = this.state;
    const { theme, promptSymbol, outputRenderers } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <TerminalContainer className={'terminalContainer'}>
          <OutputList
            promptSymbol={promptSymbol}
            outputRenderers={outputRenderers}
            outputs={this.state.emulatorState.getOutputs()}
          />

          <CommandInput
            disabled={disabled}
            ref={inputRef => {
              this.inputRef = inputRef;
            }}
            promptSymbol={
              // Non-null assertion
              promptSymbol!
            }
            value={this.state.inputStr}
            onSubmit={this.onInputSubmit}
            onKeyDown={this.onInputKeyDownEvent}
            onChange={this.onInputChange}
          />
        </TerminalContainer>
      </ThemeProvider>
    );
  }
}

export default Terminal;

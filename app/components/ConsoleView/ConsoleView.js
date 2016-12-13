import React, {Component} from 'react';
import Console from 'react-console-component';
import store from 'store';
import styled from 'styled-components';
import fuzzy from 'fuzzy';

import './RCONConsole.global.css';
import {helpText, helpCommands} from './HelpSection';
import {sendCommandToServer} from '../../utils/sendCommandToServer';
import {log} from '../../utils/loggerUtils';
import debug from '../../styles/stylesDebugger';


const welcomeMessage = `MisRCON-by @Csprance
v0.0.2 - Macadocious
Type help for more options
or tab to autocomplete
--------------------------

`;


class ConsoleView extends Component {
  constructor(props) {
    super(props);
    let credentials = store.get('userCredentials');
    this.state = {
      port: credentials.port,
      password: credentials.password,
      ip: credentials.ip
    };
  }

  clearScreen = () => {
    let container = this.refs.console.child.container;
    let children = [].slice.call(container.childNodes);
    children.splice(0, 1);
    children.splice(children.length - 3, 3);
    children.map((node) => {
      container.removeChild(node);
    });
    this.refs.console.return();
  };

  help = () => {
    this.refs.console.log(helpText);
    this.refs.console.return();
  };

  sendCommand = (command) => {
    sendCommandToServer(command, this.state).then((res) => {
      this.refs.console.log(res);
      this.refs.console.return();
    }).catch((err) => {
      this.refs.console.log(err);
      this.refs.console.return();
    });
  };


  handleInput = (text) => {
    try {
      switch (text) {
        case 'help':
          this.help(text);
          break;
        case 'cls':
          this.clearScreen(text);
          break;
        default:
          this.sendCommand(text);
      }
    } catch (e) {
      log('error', e);
      this.refs.console.log(String(e));
      this.refs.console.return();
    }
  };
  complete = (e) =>{
    const words = helpCommands.map((el)=> el.value);
    return fuzzy.filter(e[0], words).map((el) => el.string);
  };


  render() {
    return (
      <Container>
        <Console ref="console"
                 complete={this.complete}
                 handler={this.handleInput}
                 autofocus={true}
                 welcomeMessage={welcomeMessage}/>
      </Container>);
  }
}


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  ${debug('Container')}
`;

export default ConsoleView;

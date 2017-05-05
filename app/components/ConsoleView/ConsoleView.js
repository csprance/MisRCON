import React, { Component } from 'react';
import Console from 'react-console-component';
import styled from 'styled-components';
import fuzzy from 'fuzzy';
import * as misrcon from 'node-misrcon';

import { connect } from 'react-redux';

import './RCONConsole.global.css';
import * as externals from '../../../package.json';

import { helpText, helpCommands } from '../../constants/HelpSection';
import { log } from '../../utils/loggerUtils';


const welcomeMessage = `MisRCON-by @Csprance
v${externals.version} - ${externals.versionName}
Type help for more options
or tab to autocomplete
--------------------------

`;

@connect((store) => ({
  credentials: store.credentials
}))
class ConsoleView extends Component {
  constructor(props, context) {
    super(props, context);
    this.words = helpCommands.map((el) => el.value);
  }

  getHelpOn = (text) => {
    this.console.log(helpCommands.filter((el) => el.value === text)[0].display);
    this.console.return();
  };

  complete = (e) => {
    return fuzzy.filter(e[0], this.words, {}).map((el) => {
      return el.string;
    });
  };

  clearScreen = () => {
    const container = this.console.child.container;
    const children = [].slice.call(container.childNodes);
    children.splice(0, 1);
    children.splice(children.length - 3, 3);
    children.forEach((node) => {
      container.removeChild(node);
    });
    this.console.return();
  };

  askingForHelp = (text) => {
    const splitText = text.split(' ');
    if (splitText[0] === 'help') if (splitText.length === 2) return true;
    return false;
  };

  handleInput = (text) => {
    try {
      // help // get all help commands
      if (text === 'help') this.help();
      // cls // clear screen
      else if (text === 'cls') this.clearScreen();
      // help [subject] // specific help docs
      else if (this.askingForHelp(text)) this.getHelpOn(text.split(' ')[1]);
      // send command to server
      else this.sendCommand(text);
    } catch (e) {
      log('error', e);
      this.console.log(String(e));
      this.console.return();
    }
  };

  help = () => {
    this.console.log(helpText);
    this.console.return();
  };

  sendCommand = (command) => {
    misrcon.sendRCONCommandToServer({...this.props.credentials.active, command}).then((res) => {
      this.console.log(res);
      this.console.return();
    }).catch((err) => {
      this.console.log(err);
      this.console.return();
    });
  };

  render() {
    return (
      <Container>
        <Console
          ref={(console) => this.console = console}
          complete={this.complete}
          handler={this.handleInput}
          autofocus
          welcomeMessage={welcomeMessage}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
`;

export default ConsoleView;

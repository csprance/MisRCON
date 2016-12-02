import React, {Component} from 'react';
import Console from 'react-console-component';
import axios from 'axios';

import './RCONConsole.global.css';

const welcomeMessage = `MisRCON-by @Csprance
v0.0.1 - Babycakes
Type help for more options.
--------------------------

`;

export default class RCONConsole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: false,
      loggingIn: false
    };

    this.clearScreen = this.clearScreen.bind(this);
    this.help = this.help.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
    this.login = this.login.bind(this);
    this.runDefault = this.runDefault.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.listServers = this.listServers.bind(this);
  }

  clearScreen() {
    let container = this.refs.console.child.container;
    let children = [].slice.call(container.childNodes);
    children.splice(0, 1);
    children.splice(children.length - 3, 3);
    children.map((node) => {
      container.removeChild(node);
    });
    this.refs.console.return();
  }

  help(text) {
    this.refs.console.log(text);
    this.refs.console.return();
  }

  error(text) {
    this.refs.console.logX('error', text);
    this.refs.console.return();

  }

  warn(text) {
    console.log(this);
    this.refs.console.logX('warning', text);
    this.refs.console.return();
  }

  login(text) {
    this.setState({userInput: true, enteringUsername: true});
    this.refs.console.log('Please enter username');
    this.refs.console.return();

  }

  runDefault(text) {
    this.refs.console.log(text);
    this.refs.console.return();
  }

  listServers() {
    this.refs.console.log("Retrieving server list");
    axios.get("http://miscreatedgame.com/servers/api/servers_list.php").then((res) => {
      res.data.map((server) => {
        this.refs.console.log(`${server[5]}`);
      });
      this.refs.console.return();
    })
  }

  handleInput(text) {
    if (this.state.userInput) {

      if (this.state.enteringUsername) {
        this.refs.console.log('Please enter password for username: ' + text);
        this.setState({
          enteringUsername: false,
          userInput: true,
          enteringPassword: true
        });
      }

      if (this.state.enteringPassword) {
        this.refs.console.log('Logged in!');
        this.setState({
          userInput: false,
          enteringPassword: false,
          loggedIn: true
        });
      }

      this.refs.console.return();

    } else {
      try {
        switch (text) {
          case 'help':
            this.help(text);
            break;
          case 'cls':
            this.clearScreen(text);
            break;
          case 'error':
            this.error(text);
            break;
          case 'warn':
            this.warn(text);
            break;
          case 'list':
            this.listServers(text);
            break;
          case 'login':
            if (this.state.loggedIn) {
              this.refs.console.log('Already logged in!');
            } else {
              this.login(text);
            }
            break;
          default:
            this.runDefault(text);
        }
      } catch (e) {
        console.log(e);
        this.refs.console.log(String(e));
        this.refs.console.return();
      }
    }

  }

  render() {
    return (<Console ref="console"
                     handler={this.handleInput}
                     autofocus={true}
                     welcomeMessage={welcomeMessage}/>);
  }


}

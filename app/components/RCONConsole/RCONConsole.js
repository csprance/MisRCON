import React, {Component} from 'react';
import Console from 'react-console-component';
import axios from 'axios';

import './RCONConsole.global.css';
import store from 'store';

const welcomeMessage = `MisRCON-by @Csprance
v0.0.1 - Babycakes
Type help for more options.
--------------------------

`;

const helpText =
  `This console is a direct connection to your server. 
Any commands you enter here will be sent to the 
server via RCON (XMLRPC).
`;

export default class RCONConsole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: false,
      loggingIn: false
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

  error = (text) => {
    this.refs.console.logX('error', text);
    this.refs.console.return();
  };

  warn = (text) => {
    this.refs.console.logX('warning', text);
    this.refs.console.return();
  };

  login = (text) => {
    if (this.state.loggedIn) {
      this.refs.console.log('Already logged in!');
    } else {
      this.setState({userInput: true, enteringUsername: true});
      this.refs.console.log('Please enter username');
      this.refs.console.return();
    }
    this.refs.console.return();
  };

  unknownCommand = (text) => {
    this.refs.console.log(`${text} is not recognized as an internal or external command`);
    this.refs.console.return();
  };

  listServers = () => {
    this.refs.console.log("Retrieving server list");
    axios.get("http://miscreatedgame.com/servers/api/servers_list.php").then((res) => {
      res.data.map((server) => {
        this.refs.console.log(`${server[5]}`);
      });
      this.refs.console.return();
    })
  };

  listTasks = () => {
    this.refs.console.logX('long-line', store.get('savedTasks'));
    this.refs.console.return();
  };

  handleInput = (text) => {
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
          case 'list tasks':
            this.listTasks(text);
            break;
          case 'login':
            this.login(text);
            break;
          default:
            this.unknownCommand(text);
        }
      } catch (e) {
        console.log(e);
        this.refs.console.log(String(e));
        this.refs.console.return();
      }
    }

  };


  render() {
    return (<Console ref="console"
                     handler={this.handleInput}
                     autofocus={true}
                     welcomeMessage={welcomeMessage}/>);
  }


}

import React, {Component} from 'react';
import store from 'store';

import HomeView from '../components/HomeView/HomeView';
import LoginView from '../components/LoginView/LoginView';


export default class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loggedIn: this.getStoredCredentials(),
      port: '',
      password: '',
      ip: ''
    }
  }

  componentDidMount() {
    // add our event listener to listen for events from the menu
    // in this case we're logging the user out
    require('electron').ipcRenderer.on('clearUserCredentials', () => {
      store.remove('userCredentials');
      this.setState({
        loggedIn: false
      });
    });
  }


  //noinspection JSMethodCanBeStatic
  getStoredCredentials() {
    return store.get('userCredentials') !== undefined;
  }

  updatePort = (e) => {
    this.setState({
      port: e.target.value,
    });
  };

  updatePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  updateIP = (e) => {
    this.setState({
      ip: e.target.value,
    });
  };

  // log the user in and store the credentials in the localStorage TODO: Do something better here
  login = () => {
    this.setState({
      loggedIn: true,
    });
    store.set('userCredentials', {port: this.state.port, password: this.state.password, ip: this.state.ip})
  };


  render() {

    return (
      <div style={{width:'100%', display: 'flex'}}>
        {this.state.loggedIn === false ? (
          <LoginView login={this.login}
                     port={this.state.port}
                     updatePort={this.updatePort}
                     password={this.state.password}
                     updatePassword={this.updatePassword}
                     ip={this.state.ip}
                     updateIP={this.updateIP}/>
        ) : (
          <HomeView/>
        )}
      </div>);
  }


}

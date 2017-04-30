/**
 * Name: HomePage Container
 * Author: Chrissprance
 * Creation Date: 12/8/2016
 * Description: Handles Showing the main app page and the initial login/credential selection
 * as well as sending all the initial data to the other components
 */
import React, {Component} from 'react';
import store from 'store';

import HomeView from '../components/HomeView/HomeView';
import LoginView from '../components/LoginView/LoginView';
import StatusBar from '../components/StatusBar/StatusBar';
import getInitialServerData from '../utils/getInitialServerData';

// redux containers
import NotificationBar from '../containers/NotificationBar';


export default class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loggedIn: true,
    }
  }

  getServerData = () => {
    console.log('getting initial server data');
    // getInitialServerData({
    //   ip: store.get('userCredentials').ip,
    //   port: store.get('userCredentials').port,
    //   password: store.get('userCredentials').password
    // }).then((data) => {
    //   this.setState({
    //     players: data.status.playersArray,
    //     status: data.status,
    //   });
    // });
  };

  componentDidMount() {
    if (this.state.loggedIn) {
      this.getServerData();
    }
  }


  render() {
    return (
      <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
        <div style={{width: '100%', display: 'flex', flexGrow: 1}}>
          {this.state.loggedIn === false ? (
              <LoginView
                login={this.login}
                errorTextPassword={this.state.errorTextPassword}
                errorTextPort={this.state.errorTextPort}
                errorTextIp={this.state.errorTextIp}
                port={this.state.port}
                updatePort={this.updatePort}
                password={this.state.password}
                updatePassword={this.updatePassword}
                ip={this.state.ip}
                updateIP={this.updateIP}
              />
            ) : (
              <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <HomeView banListPlayers={this.state.banListPlayers}
                          players={this.state.players}
                          whiteListPlayers={this.state.whiteListPlayers}
                          status={this.state.status}/>
                <StatusBar status={this.state.status}/>
              </div>
            )}
        </div>
        <NotificationBar />
      </div>);
  }
}

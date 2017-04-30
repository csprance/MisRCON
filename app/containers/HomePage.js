/**
 * Name: HomePage Container
 * Author: Chrissprance
 * Creation Date: 12/8/2016
 * Description: Handles Showing the main app page and the initial login/credential selection
 * as well as sending all the initial data to the other components
 */
import React, { Component } from 'react';

// redux containers
import NotificationBar from '../containers/NotificationBar';
import HomeView from '../components/HomeView/HomeView';
import LoginView from '../components/LoginView/LoginView';
import StatusBar from '../components/StatusBar/StatusBar';

import { connect } from 'react-redux';
import * as server from '../actions/serverActions';
import * as credentialsActions from '../actions/credentialsActions';

@connect((store) => {
  return {
    credentials: store.credentials
  }
})
export default class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    require('electron').ipcRenderer.on('clearUserCredentials', () => {
      this.props.dispatch(credentialsActions.logOut());
    });
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.credentials.active.name.length > 0) {
      this.props.dispatch(server.getInitialData());
    }
  }

  render() {
    return (
      <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
        <div style={{width: '100%', display: 'flex', flexGrow: 1}}>

          {this.props.credentials.active.name.length === 0 ?
            <LoginView/>
            :
            <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
              <HomeView />
              <StatusBar />
            </div>
          }

          <NotificationBar />
        </div>
      </div>
    );
  }
}

/**
 * Name: HomePage Container
 * Author: Chrissprance
 * Creation Date: 12/8/2016
 * Description: Handles Showing the main app page and the initial login/credential selection
 * as well as sending all the initial data to the other components
 */
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import styled from 'styled-components';
import axios from 'axios';
import store from 'store';

import { connect } from 'react-redux';
import * as server from '../actions/serverActions';
import * as notify from '../actions/notifyActions';
import * as credentialsActions from '../actions/credentialsActions';
import * as credentialsUtils from '../utils/credentialsUtils';
import * as updateUtils from '../utils/updateUtils';
import * as utils from '../utils/utils';

// redux containers
import NotificationBar from '../containers/NotificationBar';
import HomeView from '../components/HomeView/HomeView';
import LoginView from '../components/LoginView/LoginView';
import StatusBar from '../components/StatusBar/StatusBar';

@connect((store) => ({
  credentials: store.credentials
}))
export default class HomePage extends Component {
  componentDidMount() {
    updateUtils.bootStrap();

    const notification = (
      <span>
          An Update is available &nbsp;
        <FakeLink
          onClick={() => {
            utils.handleClick('https://github.com/csprance/MisRCON/releases/latest');
          }}
        >
          - Click here!
        </FakeLink>
      </span>);

    axios.get('https://misrcon-updater.firebaseio.com/version.json')
      .then(res => {
        if (res.data !== store.get('version')) {
          this.props.dispatch(notify.emitInfo(notification));
        }
      })
      .catch(e => {
        console.log(e);
      });

    ipcRenderer.on('clearUserCredentials', () => {
      this.props.dispatch(credentialsActions.logOut());
    });

  }


  componentWillReceiveProps(nextProps) {
    if (credentialsUtils.credentialsHaveChanged(nextProps)) {
      this.props.dispatch(server.getInitialData());
    }
  }


  render() {
    return (
      <div style={{width: '100%', display: 'flex', flexDirection: 'column'}} >
        <div style={{width: '100%', display: 'flex', flexGrow: 1}} >
          {this.props.credentials.active.name.length === 0 ?
            <LoginView />
            :
            <div style={{width: '100%', display: 'flex', flexDirection: 'column'}} >
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


const FakeLink = styled.a`
  cursor: pointer;
`;

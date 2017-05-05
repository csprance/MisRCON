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
import ConsoleIcon from 'material-ui/svg-icons/device/dvr';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import BanIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import WhitelistIcon from 'material-ui/svg-icons/action/assignment';

import { connect } from 'react-redux';

import * as server from '../actions/serverActions';
import * as notify from '../actions/notifyActions';
import * as credentialsActions from '../actions/credentialsActions';
import * as credentialsUtils from '../utils/credentialsUtils';
import * as updateUtils from '../utils/updateUtils';
import * as utils from '../utils/utils';

// redux containers
import NotificationBar from '../containers/NotificationBar';
import LoginView from '../components/LoginView/LoginView';
import StatusBar from '../components/StatusBar/StatusBar';
import { Tabs, Tab } from '../components/common/Tabs';
import BansView from '../components/BansView/BansView';
import ConsoleView from '../components/ConsoleView/ConsoleView';
import PlayersView from '../components/PlayersView/PlayersView';
import ScheduledTasksView from '../components/ScheduledTasksView/ScheduledTasksView';
import WhitelistView from '../components/WhitelistView/WhitelistView';

@connect((store) => ({
  credentials: store.credentials
}))
class HomePage extends Component {
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
              <SplitPane>
                <StyledTabs
                  tabItemContainerStyle={{minHeight: 72}}
                  contentContainerStyle={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}
                  tabTemplateStyle={{display: 'flex'}}
                >
                  <Tab icon={<ConsoleIcon />} label="CONSOLE" >
                    <ConsoleView />
                  </Tab>
                  <Tab icon={<PeopleIcon />} label="PLAYERS" >
                    <PlayersView />
                  </Tab>
                  <Tab icon={<BanIcon />} label="BANS" >
                    <BansView />
                  </Tab>
                  <Tab icon={<WhitelistIcon />} label="WHITELIST" >
                    <WhitelistView />
                  </Tab>
                </StyledTabs>
                <ScheduledTasksView />
              </SplitPane>
              <StatusBar />
            </div>
          }
          <NotificationBar />
        </div>
      </div>
    );
  }
}

const SplitPane = styled.div`
  display: flex;
  align-items:stretch;
  flex-grow:1;
`;
const StyledTabs = styled(Tabs)`
  flex-grow:1;
  display:flex;
  flex-direction:column;
  align-items:stretch;
`;
const FakeLink = styled.a`
  cursor: pointer;
`;

export default HomePage;

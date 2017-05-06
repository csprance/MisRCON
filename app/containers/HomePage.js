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
import ConsoleIcon from 'material-ui/svg-icons/device/dvr';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import BanIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import WhitelistIcon from 'material-ui/svg-icons/action/assignment';
import ScheduleIcon from 'material-ui/svg-icons/action/schedule';

import { connect } from 'react-redux';
import * as server from '../actions/serverActions';
import * as credentialsActions from '../actions/credentialsActions';
import * as taskActions from '../actions/scheduledTasksActions';

import * as credentialsUtils from '../utils/credentialsUtils';
import * as updateUtils from '../utils/updateUtils';

// redux containers
import NotificationBar from '../containers/NotificationBar';
import LoginView from '../components/LoginView/LoginView';
import StatusBar from '../components/StatusBar/StatusBar';
import BansView from '../components/BansView/BansView';
import ConsoleView from '../components/ConsoleView/ConsoleView';
import PlayersView from '../components/PlayersView/PlayersView';
import ScheduledTasksView from '../components/ScheduledTasksView/ScheduledTasksView';
import WhitelistView from '../components/WhitelistView/WhitelistView';
// import WeatherView from '../components/WeatherView/WeatherView';

import { Tabs, Tab } from '../components/common/Tabs';


@connect((store) => ({
  credentials: store.credentials
}))
class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tabRoute: 'console'
    };
  }


  componentDidMount() {
    updateUtils.bootStrap(this.props.dispatch);
    ipcRenderer.on('clearUserCredentials', () => {
      this.props.dispatch(credentialsActions.logOut());
    });
  }


  componentWillReceiveProps(nextProps) {
    if (credentialsUtils.credentialsHaveChanged(nextProps)) {
      this.props.dispatch(server.getInitialData());
    }
  }


  changeTabs = (value) => {
    if (value === 'tasks') {
      this.props.dispatch(taskActions.toggleTaskList());
    } else {
      this.setState({tabRoute: value});
    }
  };


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
                  value={this.state.tabRoute}
                  onChange={this.changeTabs}
                  tabItemContainerStyle={{minHeight: 72}}
                  contentContainerStyle={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}
                  tabTemplateStyle={{display: 'flex'}}
                >

                  <Tab icon={<ConsoleIcon />} label="CONSOLE" value="console" >
                    <ConsoleView />
                  </Tab>

                  <Tab icon={<PeopleIcon />} label="PLAYERS" value="players" >
                    <PlayersView />
                  </Tab>

                  <Tab icon={<BanIcon />} label="BANS" value="bans" >
                    <BansView />
                  </Tab>

                  <Tab icon={<WhitelistIcon />} label="WHITELIST" value="whitelist" >
                    <WhitelistView />
                  </Tab>

                  <Tab icon={<ScheduleIcon />} label="TASKS" value="tasks" />

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

export default HomePage;

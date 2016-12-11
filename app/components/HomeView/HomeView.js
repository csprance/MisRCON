import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ConsoleIcon from 'material-ui/svg-icons/device/dvr';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import BanIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import WhitelistIcon from 'material-ui/svg-icons/action/assignment';
import InfoIcon from 'material-ui/svg-icons/action/info';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import styled from 'styled-components';

import BansView from '../BansView/BansView';
import ConsoleView from '../ConsoleView/ConsoleView';
import InfoView from '../InfoView/InfoView';
import SettingsView from '../SettingsView/SettingsView';
import PlayersView from '../PlayersView/PlayersView';
import ScheduledTasksView from '../ScheduledTasksView/ScheduledTasksView';
import WhitelistView from '../WhitelistView/WhitelistView';

const Home = () => (
  <SplitPane>
    <StyledTabs tabItemContainerStyle={{minHeight: 72}}
                contentContainerStyle={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
      <Tab
        icon={<ConsoleIcon />}
        label="CONSOLE">
        <ConsoleView />
      </Tab>
      <Tab
        icon={<InfoIcon />}
        label="STATS">
        <InfoView />
      </Tab>
      <Tab
        icon={<PeopleIcon />}
        label="PLAYERS">
        <PlayersView />
      </Tab>
      <Tab
        icon={<BanIcon />}
        label="BANS">
        <BansView />
      </Tab>
      <Tab
        icon={<WhitelistIcon />}
        label="WHITELIST">
        <WhitelistView />
      </Tab>

      <Tab
        icon={<SettingsIcon />}
        label="SETTINGS">
        <SettingsView />
      </Tab>
    </StyledTabs>
    <ScheduledTasksView />
  </SplitPane>
);

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


export default Home;

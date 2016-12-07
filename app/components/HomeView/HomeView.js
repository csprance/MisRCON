import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ConsoleIcon from 'material-ui/svg-icons/device/dvr';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import BanIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import InfoIcon from 'material-ui/svg-icons/action/info';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import styled from 'styled-components';

import RCONConsole from '../RCONConsole/RCONConsole';
import ScheduledTasksView from '../ScheduledTasksView/ScheduledTasksView';

const Home = () => (
  <SplitPane>
    <StyledTabs tabItemContainerStyle={{minHeight: 72}}
                contentContainerStyle={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
      <Tab
        icon={<ConsoleIcon />}
        label="CONSOLE">
        <RCONConsole />
      </Tab>
      <Tab
        icon={<PeopleIcon />}
        label="PLAYERS">
        TODO: PLAYERS TAB
      </Tab>
      <Tab
        icon={<BanIcon />}
        label="BANS">
        TODO: BANS TAB
      </Tab>
      <Tab
        icon={<InfoIcon />}
        label="STATS">
        TODO: STATS TAB
      </Tab>
      <Tab
        icon={<SettingsIcon />}
        label="SETTINGS">
        TODO: SETTINGS TAB
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

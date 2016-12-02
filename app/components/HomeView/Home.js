import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ConsoleIcon from 'material-ui/svg-icons/device/dvr';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import BanIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import InfoIcon from 'material-ui/svg-icons/action/info';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import styled from 'styled-components';
import SplitPane from 'react-split-pane';

import {black} from '../../styles/colors';
import './SplitPane.global.css';
import RCONConsole from '../RCONConsole/RCONConsole';

const Home = () => (
  <SplitPane split="vertical" primary="second" minSize={400} maxSize={1280} defaultSize={450} >
    <Tabs style={{flexGrow: 1, width: '100%'}}>
      <Tab
        icon={<ConsoleIcon />}
        label="CONSOLE">
        <RCONConsole/>
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
    </Tabs>
    <PropertyPane>
      <HeaderBar>
        SCHEDULED TASKS
      </HeaderBar>
    </PropertyPane>
  </SplitPane>
);

const PropertyPane = styled.div`
  width: 100%;
  height: 100%;
`;
const HeaderBar = styled.div`
  height: 72px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${black};
`;

export default Home;

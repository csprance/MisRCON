import React from 'react';
import ConsoleIcon from 'material-ui/svg-icons/device/dvr';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import BanIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import WhitelistIcon from 'material-ui/svg-icons/action/assignment';
import styled from 'styled-components';

import { Tabs, Tab } from '../common/Tabs';
import BansView from '../BansView/BansView';
import ConsoleView from '../ConsoleView/ConsoleView';
import PlayersView from '../PlayersView/PlayersView';
import ScheduledTasksView from '../ScheduledTasksView/ScheduledTasksView';
import WhitelistView from '../WhitelistView/WhitelistView';
import debug from '../../styles/stylesDebugger';

const Home = (props) => (
  <SplitPane>
    <StyledTabs
      tabItemContainerStyle={{minHeight: 72}}
      contentContainerStyle={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}
      tabTemplateStyle={{display: 'flex'}} >
      <Tab
        icon={<ConsoleIcon />}
        label="CONSOLE"
      >
        <ConsoleView />
      </Tab>
      <Tab
        icon={<PeopleIcon />}
        label="PLAYERS"
      >
        <PlayersView players={props.players} />
      </Tab>
      <Tab
        icon={<BanIcon />}
        label="BANS"
      >
        <BansView banListPlayers={props.banListPlayers} />
      </Tab>
      <Tab
        icon={<WhitelistIcon />}
        label="WHITELIST"
      >
        <WhitelistView whiteListPlayers={props.whiteListPlayers} />
      </Tab>
    </StyledTabs>
    <ScheduledTasksView />
  </SplitPane>
);

const SplitPane = styled.div`
  display: flex;
  align-items:stretch;
  flex-grow:1;
   ${debug('Split Pane')}
`;


const StyledTabs = styled(Tabs)`
  flex-grow:1;
  display:flex;
  flex-direction:column;
  align-items:stretch;
  ${debug('StyledTabs')}
`;


export default Home;

import List from '@material-ui/core/List';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import ListItemLink from '../components/ListItemLink';
import ServerPropertiesListItem from '../components/ServerPropertiesListItem';
import { toggleUpdateServerDialog } from '../redux/app/actions';
import { Server } from '../redux/servers';
import {
  getServerDataThunk,
  removeServerThunk
} from '../redux/servers/actions';
import { activeServerSelector } from '../redux/servers/selectors';
import { bg1 } from '../styles/colors';

const Wrapper = styled.div`
  display: flex;
  background: ${bg1};
  flex-grow: 1;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 240px;
  min-width: 240px;
  max-width: 240px;
  border-radius: 7px 0 0 0;
`;

interface Props extends RouteComponentProps {}
const NavigationBar: React.FunctionComponent<Props> = ({ location }) => {
  const dispatch = useDispatch();
  const toggleUpdateDialog = () => dispatch(toggleUpdateServerDialog());
  const deleteServer = (id: number) => dispatch(removeServerThunk(id));
  const refreshServer = (server: Server) =>
    dispatch(getServerDataThunk(server));
  const activeServer = useSelector(activeServerSelector);
  const [navItems] = React.useState([
    {
      to: '/console',
      primary: '# Console',
      order: 0
    },
    {
      to: '/map',
      primary: '# Map',
      order: 1
    },
    {
      to: '/players',
      primary: '# Players',
      order: 2
    },
    {
      to: '/banlist',
      primary: '# Banlist',
      order: 3
    },
    {
      to: '/whitelist',
      primary: '# Whitelist',
      order: 4
    },
    {
      to: '/tasks',
      primary: '# Tasks',
      order: 5
    },
    {
      to: '/help',
      primary: '# Help',
      order: 6
    },
    // {
    //   to: '/hosting',
    //   primary: '# Hosting',
    //   order: 7
    // }
  ]);

  return (
    <Wrapper>
      <List
        style={{
          paddingTop: 0,
          width: '100%',
          overflowY: 'auto'
        }}
        component="nav"
      >
        <ServerPropertiesListItem
          toggleEditServerDialog={() => toggleUpdateDialog()}
          refreshServerData={() => refreshServer(activeServer)}
          deleteServer={() => deleteServer(activeServer.id)}
          activeServer={activeServer}
        />
        {[...navItems]
          .sort((a, b) => a.order - b.order)
          .map(({ to, primary }) => (
            <ListItemLink
              key={to}
              currentPath={location.pathname}
              to={to}
              primary={primary}
            />
          ))}
      </List>
    </Wrapper>
  );
};

export default withRouter(NavigationBar);

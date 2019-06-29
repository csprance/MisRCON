import List from '@material-ui/core/List';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import ListItemLink from '../components/ListItemLink';
import ServerPropertiesListItem from '../components/ServerPropertiesListItem';
import { toggleUpdateServerDialog } from '../redux/app/actions';
import { Dispatch, RootState } from '../redux/redux-types';
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

type OwnProps = {};
type ReduxProps = {
  toggleUpdateDialog: () => void;
  activeServer: Server;
  deleteServer: (id: number) => void;
  refreshServer: (server: Server) => void;
};
type State = {};
class NavigationBar extends React.Component<
  OwnProps & ReduxProps & RouteComponentProps<{}>,
  State
> {
  public static defaultProps = {};
  public state = {};

  public render() {
    const {
      activeServer,
      deleteServer,
      location,
      refreshServer,
      toggleUpdateDialog
    } = this.props;

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
          <ListItemLink
            currentPath={location.pathname}
            to={'/console'}
            primary={'# Console'}
          />
          <ListItemLink
            currentPath={location.pathname}
            to={'/map'}
            primary={'# Map'}
          />
          <ListItemLink
            currentPath={location.pathname}
            to={'/players'}
            primary={'# Players'}
          />
          <ListItemLink
            currentPath={location.pathname}
            to={'/banlist'}
            primary={'# Banlist'}
          />
          <ListItemLink
            currentPath={location.pathname}
            to={'/whitelist'}
            primary={'# Whitelist'}
          />
          <ListItemLink
            currentPath={location.pathname}
            to={'/tasks'}
            primary={'# Tasks'}
          />
          <ListItemLink
            currentPath={location.pathname}
            to={'/hosting'}
            primary={'# Hosting'}
          />
          <ListItemLink
            currentPath={location.pathname}
            to={'/logs'}
            primary={'# Logs'}
          />
          <ListItemLink
            currentPath={location.pathname}
            to={'/chat'}
            primary={'# Chat'}
          />
          <ListItemLink
            currentPath={location.pathname}
            to={'/help'}
            primary={'# Help'}
          />
        </List>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: RootState, _ownProps: OwnProps) => ({
  activeServer: activeServerSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch, _ownProps: OwnProps) => ({
  toggleUpdateDialog: () => dispatch(toggleUpdateServerDialog()),
  deleteServer: (id: number) => dispatch(removeServerThunk(id)),
  refreshServer: (server: Server) => dispatch(getServerDataThunk(server))
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
);

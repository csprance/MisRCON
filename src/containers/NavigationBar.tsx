import List from '@material-ui/core/List';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ListItemLink from '../components/ListItemLink';
import ServerPropertiesListItem from '../components/ServerPropertiesListItem';
import Server from '../db/entities/Server';
import { Dispatch, RootState } from '../redux/redux-types';
import { removeServerFromDbThunk } from '../redux/servers/actions';
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

type Props = {
  activeServer: Server;
  deleteServer: (id: number) => void;
};
type State = {};
class NavigationBar extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {};

  public render() {
    const { activeServer, deleteServer } = this.props;

    return (
      <Wrapper>
        <List
          style={{
            paddingTop: 0,
            width: '100%',
            overflowY: 'scroll'
          }}
          component="nav"
        >
          <ServerPropertiesListItem
            deleteServer={() => deleteServer(activeServer.id)}
            activeServer={activeServer}
          />
          <ListItemLink to={'/console'} primary={'# Console'} />
          <ListItemLink to={'/map'} primary={'# Map'} />
          <ListItemLink to={'/players'} primary={'# Players'} />
          <ListItemLink to={'/banlist'} primary={'# Banlist'} />
          <ListItemLink to={'/whitelist'} primary={'# Whitelist'} />
          <ListItemLink to={'/tasks'} primary={'# Tasks'} />
          <ListItemLink to={'/hosting'} primary={'# Hosting'} />
          <ListItemLink to={'/logs'} primary={'# Logs'} />
          <ListItemLink to={'/chat'} primary={'# Chat'} />
          <ListItemLink to={'/help'} primary={'# Help'} />
        </List>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  activeServer: activeServerSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteServer: (id: number) => dispatch(removeServerFromDbThunk({ id }))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

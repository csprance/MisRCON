import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import AddServerButton from '../components/AddServerButton';
import ServerAvatar from '../components/ServerAvatar';
import { toggleAddServerDialog } from '../redux/app/actions';
import { Dispatch, RootState } from '../redux/redux-types';
import { Server, ServersState  } from '../redux/servers';
import { markServerActive } from '../redux/servers/actions';
import {
  activeServerSelector,
  serversSelector
} from '../redux/servers/selectors';
import { bg0 } from '../styles/colors';

const Wrapper = styled.div`
  display: flex;
  background: ${bg0};
  flex-grow: 1;
  width: 70px;
  min-width: 70px;
  max-width: 70px;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

type Props = {
  activeServer: Server;
  selectServer: (id: number) => void;
  servers: ServersState;
  showAddServerDialog: () => void;
};
const ServerBar: React.FunctionComponent<Props> = ({
  activeServer,
  selectServer,
  servers,
  showAddServerDialog
}) => {
  return (
    <Wrapper>
      {servers.map(server => (
        <ServerAvatar
          active={activeServer.id === server.id}
          key={server.id}
          selectServer={selectServer}
          id={server.id}
          name={server.name}
          avatarURL={server.avatar}
        />
      ))}
      <AddServerButton showAddServerDialog={showAddServerDialog} />
    </Wrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  servers: serversSelector(state),
  activeServer: activeServerSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectServer: (id: number) => dispatch(markServerActive(id)),
  showAddServerDialog: () => dispatch(toggleAddServerDialog())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerBar);

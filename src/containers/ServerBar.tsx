import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import AddServerButton from '../components/AddServerButton';
import ServerAvatar from '../components/ServerAvatar';
import { toggleAddServerDialog } from '../redux/app/actions';
import { markServerActiveThunk } from '../redux/servers/actions';
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

interface Props {}
const ServerBar: React.FunctionComponent<Props> = ({}) => {
  const servers = useSelector(serversSelector);
  const activeServer = useSelector(activeServerSelector);
  const dispatch = useDispatch();
  const selectServer = (id: number) => dispatch(markServerActiveThunk(id));
  const showAddServerDialog = () => dispatch(toggleAddServerDialog());

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

export default ServerBar;

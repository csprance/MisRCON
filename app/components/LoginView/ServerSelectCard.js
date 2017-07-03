/**
 * Name: ServerSelectCard
 * Created by chris on 4/29/2017.
 * Description:
 */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import PlayArrowIcon from 'material-ui/svg-icons/av/play-arrow';
import styled from 'styled-components';

import * as credentialsActions from '../../actions/credentialsActions';

import { lightGray } from '../../styles/colors';

// TODO: add in an edit button

const ServerSelectCard = props => {
  const useCredentials = () => {
    props.dispatch(credentialsActions.useCredentials(props.name));
  };

  const removeCredentials = () => {
    props.dispatch(credentialsActions.removeCredentials(props.name));
  };

  return (
    <Container className="server-select">
      <ServerDetails>
        <ServerName>{props.name}</ServerName>
        <ServerIp>{props.ip}:{props.port}</ServerIp>
      </ServerDetails>

      <IconButton onTouchTap={removeCredentials} touch tooltip={'Delete'}>
        <TrashIcon />
      </IconButton>

      <IconButton onTouchTap={useCredentials} touch tooltip={'Connect'}>
        <PlayArrowIcon />
      </IconButton>

    </Container>
  );
};

const ServerDetails = styled.div`
  display: flex;
  flex-grow: 10;
  flex-direction: column;
`;

const Container = styled.div`
  flex-direction: row;
  margin: 10px;
  display: flex;
  box-sizing: border-box;
  height: 80px;
  border-radius: 4px;
  width: 300px;
  background: ${lightGray};
  padding: 20px;
  position: relative;
`;

const ServerName = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-grow: 1;
`;

const ServerIp = styled.div`
  display: flex;
  font-size: 12px;
  flex-grow: 1;
`;

export default ServerSelectCard;

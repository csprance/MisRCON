/**
 * Name: ServerSelectCard
 * Created by chris on 4/29/2017.
 * Description:
 */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import VertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';

import { lightGray } from '../../styles/colors';


const ServerSelectCard = (props) => {
  return (
    <Container onClick={(e) => {
      console.log(e.target);
    }}>
      <ServerDetails>
        <ServerName>{props.name}</ServerName>
        <ServerIp>{props.ip}:{props.port}</ServerIp>
      </ServerDetails>
      <IconMenu
        style={{zIndex: 9}}
        iconButtonElement={<IconButton touch={true} tooltip={'Edit'}><VertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem primaryText="Connect"/>
        <MenuItem primaryText="Edit"/>
        <MenuItem primaryText="Delete"/>
      </IconMenu>
    </Container>
  );
};

const ServerDetails = styled.div`
  display: flex;
  flex-grow: 10;
  flex-direction: column;
`;

const Container = styled.div`
  cursor: pointer;
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

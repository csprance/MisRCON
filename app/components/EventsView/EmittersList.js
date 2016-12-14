/**
 * Name: Emitters List
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description: Contains a list of all the steamids emitting events on the server
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';

import EmittersListHeader from './EmittersListHeader';
import Emitter from './Emitter'
import {black, white} from '../../styles/colors';
import TextField from 'material-ui/TextField';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={black} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem primaryText="Kick"/>
    <MenuItem primaryText="Ban"/>
    <MenuItem primaryText="UnWhiteList"/>
  </IconMenu>
);

const EmittersView = () => (
    <Container>
      <EmittersListHeader />
      <StaticList>
        <TextField style={{width: '85%', paddingLeft: 15}} placeholder="Search...."/>
        <ListItem
          primaryText="All Events"
        />
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
        <Emitter rightIconMenu={rightIconMenu}/>
      </StaticList>
    </Container>
);

const Container = styled.div`
  padding-top: 72px;
  overflow-y: auto;
  width: 100%;
`;
const StaticList = styled(List)`
  overflow-y: auto;
  position:absolute;
  top: 72px;
  left:0px;
  right:0px;
  bottom:0px; 
`;
export default EmittersView;

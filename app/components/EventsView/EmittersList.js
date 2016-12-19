/**
 * Name: Emitters List
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description: Contains a list of all the steamids emitting events on the server
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';


import EmittersListHeader from './EmittersListHeader';
import Emitter from './Emitter'


const EmittersList = (props) => (
  <Container>
    <EmittersListHeader handleDrawerOpen={props.handleDrawerOpen} parseAllLogs={props.parseAllLogs}/>
    <StaticList>
      <TextField name={'searchField'} style={{width: '85%', paddingLeft: 15}} placeholder="Search...."/>
      <ListItem
        primaryText="All Events"
        onTouchTap={props.onSelect.bind(null, 'ALL')}
      />
      {props.emitters.map((emitter) => {
        return (
          <Emitter
            kickPlayer={props.kickPlayer}
            banPlayer={props.banPlayer}
            unWhiteListPlayer={props.unWhiteListPlayer}
            key={emitter.steam}
            onSelect={props.onSelect}
            steam={emitter.steam}
            name={emitter.name}
            avatar={emitter.avatar}
            lastUpdate={emitter.lastUpdate}
            lastMsg={emitter.msg}
          />
        );
      })}
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

export default EmittersList;

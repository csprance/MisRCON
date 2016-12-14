/**
 * Name: InfoView
 * Author: Chrissprance
 * Creation Date: 12/8/2016
 * Description: Contains EmittersList and EventsContainer
 * EmittersList is a list of Emitters sorted by steamid
 * EventsContainer contains a list of events passed to it based on the Emitter.steamid
 * Emitters are players that are emitting Events on the server
 * Events are any action that causes a log line to be created.
 *
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import SplitPane from 'react-split-pane';

import {eventizeChatLog} from '../../utils/chatLogUtils';
import EventsContainer from './EventsContainer';
import EmittersList from './EmittersList';


export default class EventsView extends Component {
  parseLogs = () => {
    console.log(eventizeChatLog());
  };



  render() {
    return (
      <Container>
        <Row split="vertical" minSize={250} defaultSize={350} maxSize={500}>
          <EmittersList />
          <EventsContainer />
        </Row>
      </Container>
    );
  }
}


const Container = styled.div`
  flex-direction: column;
  width: 100%;
  display: flex;
  flex-grow: 1;
`;

const Row = styled(SplitPane)`
  flex-direction: row;
  width: 100%;
  display: flex;
  position: relative !important;
  flex-grow: 1;
`;

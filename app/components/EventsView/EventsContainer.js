/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description: Contains all the events from the currently select SteamiD (or all events)
 *              from the EmittersList
 */
import React, {
  PropTypes,
} from 'react';
import styled from 'styled-components';
import ChatEventCard from './EventCards/ChatEventCard';
import DamageEventCard from './EventCards/DamageEventCard';
import EventsContainerHeader from './EventsContainerHeader';

const EventContainer = (props) => {
  return (
    <div>
      <EventsContainerHeader />
      <Container>
        <ChatEventCard />
        <ChatEventCard />
        <ChatEventCard />
        <DamageEventCard />
        <DamageEventCard />
        <DamageEventCard />
        <ChatEventCard />
        <ChatEventCard />
        <DamageEventCard />
        <ChatEventCard />
        <DamageEventCard />
        <DamageEventCard />
      </Container>
    </div>
  );
};

const Container = styled.div`
  overflow-y: auto;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  position:absolute;
  top: 85px;
  left:0px;
  right:0px;
  bottom:0px;  
`;


export default EventContainer;

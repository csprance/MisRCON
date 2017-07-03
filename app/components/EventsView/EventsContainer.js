/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description: Contains all the events from the currently select SteamiD (or all events)
 *              from the EmittersList
 */
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import ReactChatView from './ChatView';
import List from 'react-virtualized';

import ChatEventCard from './EventCards/ChatEventCard';
import DamageEventCard from './EventCards/DamageEventCard';
import EventsContainerHeader from './EventsContainerHeader';

const EventContainer = props => {
  const isSelected = event =>
    props.selected === 'ALL' ? true : event.steam === props.selected;
  return (
    <div>
      <EventsContainerHeader
        toggleKills={props.toggleKills}
        kickPlayer={props.kickPlayer}
        banPlayer={props.banPlayer}
        unWhiteListPlayer={props.unWhiteListPlayer}
        selected={props.selected}
      />
      <Container
        className="events-list"
        scrollLoadThreshold={50}
        onInfiniteLoad={props.loadMore.bind(null, props.selected)}
      >
        {props.events.filter(isSelected).map(event => {
          if (event.type === 'chat') {
            return (
              <ChatEventCard
                key={event.steam + String(Math.random())}
                avatar={event.avatar}
                time={event.time}
                name={event.name}
                steam={event.steam}
                ip={event.ip}
                msg={event.msg}
              />
            );
          } else {
            return (
              <DamageEventCard
                key={event.steam + String(Math.random())}
                kill={event.kill}
                time={event.time}
                name={event.name}
                steam={event.steam}
                targetSteam={event.targetSteam}
                targetName={event.targetName}
                weapon={event.weapon}
                distance={event.distance}
                damage={event.damage}
                melee={event.melee}
                headshot={event.headshot}
                part={event.part}
                hitType={event.hitType}
                projectile={event.projectile}
              />
            );
          }
        })}
      </Container>
    </div>
  );
};

const Container = styled(ReactChatView)`
  overflow-y: auto;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  padding-left: 110px;
  padding-right: 80px;
  padding-top: 20px;
  position:absolute;
  top: 85px;
  left:0px;
  right:0px;
  bottom:0px;  
`;

export default EventContainer;

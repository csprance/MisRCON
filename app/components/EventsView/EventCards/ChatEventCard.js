/**
 * Name: ChatEventCard
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description: The compoonent used to dispaly information about a chatEvent
 */
import React, {
  PropTypes,
} from 'react';
import Avatar from 'material-ui/Avatar';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import store from 'store';

import {darkGrey, offWhite} from '../../../styles/colors';

const ChatEventCard = (props) => {
  return (
    <ChatEvent zDepth={1}>
      <ChatAvatar
        src={store.get(props.steam).avatar}
        size={60}
      />
      <Time>{props.time}</Time>
      <Name>{props.name} - <Steam>{props.steam}</Steam></Name>
      <IP>{props.ip}</IP>
      <Msg>{props.msg}</Msg>
    </ChatEvent>
  );
};

const Time = styled.div`
  position: absolute;
  top: 0px;
  right: -60px;
  font-size: 14px;
  font-weight: 200;
  color: ${offWhite}
`;
const Name = styled.div`
  
`;
const Msg = styled.div`
  
`;
const Steam = styled.div`
  
`;
const IP = styled.div`
  
`;

const ChatAvatar = styled(Avatar)`
  position: absolute;
  left: -85px;
  top: 0;
`;

const ChatEvent = styled(Paper)`
  margin-bottom: 25px;
  width: 80%;
  font-weight: 400;
  color: ${darkGrey};
  position: relative;
  padding: 15px;
  min-height: 120px;
  background: rgb(48, 48, 48);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  &:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 15px 19px 15px 0;
    border-color: transparent rgb(48, 48, 48);
    display: block;
    width: 0;
    z-index: 1;
    left: -19px;
    top: 12px;
  }
`;

ChatEventCard.propTypes = {};
ChatEventCard.defaultProps = {};

export default ChatEventCard ;

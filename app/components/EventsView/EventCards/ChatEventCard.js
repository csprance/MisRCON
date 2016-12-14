/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description:
 */
import React, {
  PropTypes,
} from 'react';
import Avatar from 'material-ui/Avatar';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

import {darkGrey, black, white, offWhite} from '../../../styles/colors';

const ChatEventCard = (props) => {
  console.log(props);
  return (
    <ChatEvent zDepth={1}>
      <ChatAvatar
        src="http://placehold.it/42x42"
        size={60}
      />
      <Date>12-14-2016</Date>
      <Name>Mister FuzzyPants: </Name>
      <Steam>7546857452154895</Steam>
      <IP>192.168.1.100</IP>
      <Msg> I just raided your base bro! Haha </Msg>
    </ChatEvent>
  );
};

const Date = styled.div`
  position: absolute;
  top: -16px;
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
  :after {
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

ChatEventCard .propTypes = {};
ChatEventCard .defaultProps = {};

export default ChatEventCard ;

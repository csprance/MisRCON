/**
 * Name: StatusBar
 * Author: Chrissprance
 * Creation Date: 12/12/2016
 * Description: shows the info on the currently connected to server
 */
import React, {
  PropTypes,
} from 'react';
import styled from 'styled-components';
import debug from '../../styles/stylesDebugger';

import {darkGrey} from '../../styles/colors';


const StatusBar = (props) => {
  return (
    <Container>
      <Item>Name: {props.name}</Item>
      <Item>IP: {props.ip}</Item>
      <Item>Version: {props.version}</Item>
      <Item>Players: {props.players}</Item>
    </Container>
  );
};

StatusBar.propTypes = {};
StatusBar.defaultProps = {};

const Container = styled.div`
  display:flex;
  height: 30px;
  min-height: 30px;
  max-height: 30px;
  background: ${darkGrey}
  ${debug('Container')}
`;

const Item = styled.div`
  min-width: 100px;
  padding: 5px;
  ${debug('Item')}
`;

export default StatusBar;

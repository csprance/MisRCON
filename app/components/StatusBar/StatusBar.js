/**
 * Name: StatusBar
 * Author: Chrissprance
 * Creation Date: 12/12/2016
 * Description: shows the info on the currently connected to server
 */
import React, {Component, PropTypes,} from 'react';
import styled from 'styled-components';
import debug from '../../styles/stylesDebugger';
import store from 'store';
import {darkGrey} from '../../styles/colors';


const StatusBar = (props) => {
  return (
    <Container>
      <Item>IP: {store.get('userCredentials').ip} </Item>
      <Item>Port: {store.get('userCredentials').port} </Item>
      {/*<Item>Name: {this.state.status.name}</Item>*/}
      {/*<Item>Version: {this.state.status.version}</Item>*/}
      {/*<Item>Players: {this.state.status.players}</Item>*/}
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


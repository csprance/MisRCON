/**
 * Name: StatusBar
 * Author: Chrissprance
 * Creation Date: 12/12/2016
 * Description: shows the info on the currently connected to server
 * Props flow from Containers/HomePage
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import debug from '../../styles/stylesDebugger';
import store from 'store';
import {darkGrey} from '../../styles/colors';


const StatusBar = (props) => {
  return (
    <Container>
      <Item>IP: {store.get('userCredentials').ip} </Item>
      <Item>Port: {store.get('userCredentials').port} </Item>
      <Item>Name: {props.status !== undefined ? props.status.name : 'Connecting...'}</Item>
      <Item>Version: {props.status !== undefined ? props.status.version : 'Connecting...'}</Item>
      <Item>Players: {props.status !== undefined ? props.status.players : 'Connecting...'}</Item>
    </Container>
  );
};

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


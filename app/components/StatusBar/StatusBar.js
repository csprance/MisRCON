/**
 * Name: StatusBar
 * Author: Chrissprance
 * Creation Date: 12/12/2016
 * Description: shows the info on the currently connected to server
 * Props flow from Containers/HomePage
 */
import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

import debug from '../../styles/stylesDebugger';
import { darkGrey } from '../../styles/colors';


@connect((store) => {
  return {
    server: store.server,
    credentials: store.credentials
  }
})
class StatusBar extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <Container>
        <Item>Name: {this.props.server.status.name}</Item>
        <Item>IP: {this.props.credentials.active.ip} </Item>
        <Item>Port: {this.props.credentials.active.port} </Item>
        <Item>Version: {this.props.server.status.version}</Item>
        <Item>Players: {this.props.server.status.players}</Item>
      </Container>
    );
  }
}

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


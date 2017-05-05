/**
 * Name: StatusBar
 * Author: Chrissprance
 * Creation Date: 12/12/2016
 * Description: shows the info on the currently connected to server
 */
import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

import { darkGrey } from '../../styles/colors';


@connect((store) => ({
  server: store.server,
  credentials: store.credentials
}))
class StatusBar extends Component {
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
`;
const Item = styled.div`
  min-width: 100px;
  padding: 5px;
`;

export default StatusBar;

/**
 * Name: ServerAddOverlay
 * Created by chris on 4/29/2017.
 * Description:
 */
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import BackArrowIcon from 'material-ui/svg-icons/navigation/chevron-left';

import { darkGrey, lightGray, white } from '../../styles/colors';

class ServerAddOverlay extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: this.props.show, // this.props.show,
      ip: '',
      port: '',
      password: '',
      name: '',
      errorTextPassword: '',
      errorTextPort: '',
      errorTextIp: '',
      errorTextName: '',
    };
  }

  serverIsValid = () => {
    if (this.state.password === '') {
      this.setState({
        errorTextPassword: 'Password is required',
      });
      return false;
    }
    if (this.state.port === '') {
      this.setState({
        errorTextPort: 'Port is required',
      });
      return false;
    }
    if (this.state.ip === '') {
      this.setState({
        errorTextIp: 'IP address is required',
      });
      return false;
    }
    if (this.state.name === '') {
      this.setState({
        errorTextName: 'Name is required',
      });
      return false;
    }
    if (this.state.name) {
      this.setState({
        errorTextName: 'Name already exists',
      });
      return false;
    }
    // All filled in
    // Log in and store credentials
    if (this.state.port !== '' && this.state.password !== '' && this.state.ip !== '' && this.state.name !== '') {
      return true;
    }
  };

  updatePort = (e) => {
    this.setState({
      port: e.target.value,
      errorTextPort: ''
    });
  };

  updatePassword = (e) => {
    this.setState({
      password: e.target.value,
      errorTextPassword: ''
    });
  };

  updateName = (e) => {
    this.setState({
      name: e.target.value,
      errorTextName: ''
    });
  };

  updateIP = (e) => {
    this.setState({
      ip: e.target.value,
      errorTextIp: ''
    });
  };

  storeServerCredentials = () => {
    if (this.serverIsValid()) {
      console.log('storing', this.state);
      this.close();
    }
  };

  close = () => {
    this.props.hideServerAddOverlay();
  };


  render() {
    return (
      <Container show={this.props.show}>
        <LoginBoxHeader>
          <IconButton style={{position: 'absolute', left: 20, top: 20}} touch={true} tooltip={'Go Back'}
                      onTouchTap={this.close}>
            <BackArrowIcon />
          </IconButton>
          <h3 style={{flexGrow: 9}}>Add Server</h3>
        </LoginBoxHeader>
        <TextField onChange={this.updateName}
                   errorText={this.state.errorTextName}
                   value={this.state.name}
                   floatingLabelStyle={{color: white}}
                   floatingLabelText="Name"/>
        <TextField onChange={this.updateIP}
                   errorText={this.state.errorTextIp}
                   value={this.state.ip}
                   floatingLabelStyle={{color: white}}
                   floatingLabelText="IP"/>
        <TextField onChange={this.updatePort}
                   errorText={this.state.errorTextPort}
                   value={this.state.port}
                   floatingLabelStyle={{color: white}}
                   floatingLabelText="Port"/>
        <TextField onChange={this.updatePassword}
                   errorText={this.state.errorTextPassword}
                   value={this.state.password}
                   floatingLabelStyle={{color: white}}
                   floatingLabelText="Password"/>
        <ActionButtons>
          <FlatButton label="Login" secondary={true} onTouchTap={this.storeServerCredentials}/>
        </ActionButtons>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  left: ${(props) => props.show ? 0 : '900px'};
  background: ${lightGray};
  transition-duration: .5s;
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  min-width:100%;
  align-items: center;
  justify-content:flex-start;
  flex-align: start;
  flex-grow:1;
  flex-direction: column;
 
`;

const LoginBoxHeader = styled.div`
  position: relative;
  padding-top:15px;  
  padding-bottom:15px;
  background: ${darkGrey};
  color: white;
  width: 100%;
  text-align:center;
`;

const ActionButtons = styled.div`
  display; flex;
`;


export default ServerAddOverlay;

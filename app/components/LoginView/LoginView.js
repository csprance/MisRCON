import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';

import {black, darkGrey, white} from '../../styles/colors';

const LoginView = (props) => (
  <Container>
    <LoginBox zDepth={2}>
      <LoginBoxHeader><h3>Enter Server Credentials</h3></LoginBoxHeader>
      <Content>
        <TextField onChange={props.updateIP}
                   value={props.ip}
                   floatingLabelStyle={{color: white}}
                   floatingLabelText="IP"/>
        <TextField onChange={props.updatePort}
                   value={props.port}
                   floatingLabelStyle={{color: white}}
                   floatingLabelText="Port"/>
        <TextField onChange={props.updatePassword}
                   value={props.password}
                   floatingLabelStyle={{color: white}}
                   floatingLabelText="Password"/>
      </Content>
      <ActionButtons>
        <FlatButton label="Login" secondary={true} onTouchTap={props.login}/>
      </ActionButtons>
    </LoginBox>
  </Container>
);

const Container = styled.div`
  align-items: center;
  justify-content:center;
  display: flex;
  flex-grow:1;
  flex-direction: row;
`;

const LoginBox = styled(Paper)`
  background: ${black};
  width:450px;
`;

const LoginBoxHeader = styled.div`
  padding-top:15px;  
  padding-bottom:15px;
  background: ${darkGrey};
  color: white;
  width: 100%;
  text-align:center;
`;
const ActionButtons = styled.div`
  padding-top:20px;
  padding-bottom:20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:center;
  width: 100%;
`;
const Content = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default LoginView;

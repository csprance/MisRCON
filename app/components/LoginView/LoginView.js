import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import ServerSelectCard from './ServerSelectCard';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { black, darkGrey, white } from '../../styles/colors';


//TODO: Maybe some better checking of valid ip, port and passwords here

const LoginView = (props) => (
  <Container>
    <LoginBox zDepth={2}>
      <LoginBoxHeader>
        <h3 style={{flexGrow: 9}}>Select Server</h3>
        <FloatingActionButton
          mini={true}
          secondary={true}
          style={{marginRight: 20, position: 'absolute', right: 0, top: 25}}>
          <ContentAdd />
        </FloatingActionButton>
      </LoginBoxHeader>
      <Content>
        <ServerSelectCard name={'US75'} ip={'192.168.1.1'} port={'64099'} password={'password'}/>
        <ServerSelectCard name={'BR1'} ip={'192.168.1.1'} port={'64099'} password={'password'}/>
        <ServerSelectCard name={'DEV'} ip={'192.168.1.1'} port={'64099'} password={'password'}/>
        {/*<TextField onChange={props.updateIP}*/}
        {/*errorText={props.errorTextIp}*/}
        {/*value={props.ip}*/}
        {/*floatingLabelStyle={{color: white}}*/}
        {/*floatingLabelText="IP"/>*/}
        {/*<TextField onChange={props.updatePort}*/}
        {/*errorText={props.errorTextPort}*/}
        {/*value={props.port}*/}
        {/*floatingLabelStyle={{color: white}}*/}
        {/*floatingLabelText="Port"/>*/}
        {/*<TextField onChange={props.updatePassword}*/}
        {/*errorText={props.errorTextPassword}*/}
        {/*value={props.password}*/}
        {/*floatingLabelStyle={{color: white}}*/}
        {/*floatingLabelText="Password"/>*/}
      </Content>
      {/*<ActionButtons>*/}
      {/*<FlatButton label="Login" secondary={true} onTouchTap={props.login}/>*/}
      {/*</ActionButtons>*/}
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
  width: 450px;
  min-height: 250px;
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

const Content = styled.div`
  padding-top: 20px;
  padding-bottom: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default LoginView;

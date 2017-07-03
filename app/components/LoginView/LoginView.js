import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';

import ServerAddOverlay from './ServerAddOverlay';
import ServerSelectCard from './ServerSelectCard';
import { black, darkGrey } from '../../styles/colors';

@connect(store => ({
  credentials: store.credentials
}))
class LoginView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };
  }

  showServerAddOverlay = () => {
    this.setState({
      show: true
    });
  };

  hideServerAddOverlay = () => {
    this.setState({
      show: false
    });
  };

  render() {
    return (
      <Container>
        <LoginBox zDepth={2}>
          <LoginBoxHeader>
            <h3 style={{ flexGrow: 9 }}>Select Server</h3>
            <FloatingActionButton
              onTouchTap={this.showServerAddOverlay}
              mini
              secondary
              style={{
                marginRight: 20,
                position: 'absolute',
                right: 0,
                top: 25
              }}
            >
              <ContentAdd />
            </FloatingActionButton>
          </LoginBoxHeader>
          <Content>
            {this.props.credentials.inactive.map(server => (
              <ServerSelectCard
                dispatch={this.props.dispatch}
                key={server.name}
                name={server.name}
                ip={server.ip}
                port={server.port}
                password={server.password}
              />
            ))}
          </Content>
          <ServerAddOverlay
            dispatch={this.props.dispatch}
            show={this.state.show}
            hideServerAddOverlay={this.hideServerAddOverlay}
          />
        </LoginBox>
      </Container>
    );
  }
}

const Container = styled.div`
  align-items: center;
  justify-content:center;
  display: flex;
  flex-grow:1;
  flex-direction: row;
`;

const LoginBox = styled(Paper)`
  overflow: hidden;
  position: relative;
  background: ${black};
  width: 450px;
  min-height: 500px;
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
  padding-bottom: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default LoginView;

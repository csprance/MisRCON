import * as React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter as Router, Route, Switch } from 'react-router';
import styled from 'styled-components';

import withTerminal from './components/RCONTerminal/withTerminal';
import TitleBar from './components/TitleBar';
import AddServer from './containers/AddServer';
import CreateAccount from './containers/CreateAccount';
import ForgotPassword from './containers/ForgotPassword';
import Map from './containers/Map';
import PlayersList from './containers/PlayersList';
import ServerSelect from './containers/ServerSelect';

import { bootstrapApplicationThunk } from './redux/bootstrap';
import { Dispatch } from './redux/redux-types';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const Content = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;
type Props = {
  dispatch: Dispatch;
};
type State = {};
class WrappedApp extends React.Component<Props, State> {
  public async componentDidMount() {
    this.props.dispatch(bootstrapApplicationThunk());
  }

  public render() {
    return (
      <Router>
        <Wrapper>
          <TitleBar dispatch={this.props.dispatch} />
          <Content>
            <Switch>
              <Route exact path={'/'} component={ServerSelect} />
              <Route path={'/create'} component={CreateAccount} />
              <Route path={'/forgot'} component={ForgotPassword} />
              <Route path={'/admin'} component={withTerminal(Map)} />
              <Route path={'/add'} component={AddServer} />
              <Route path={'/map'} component={withTerminal(Map)} />
            </Switch>
          </Content>
        </Wrapper>
      </Router>
    );
  }
}
export const App = connect()(WrappedApp);

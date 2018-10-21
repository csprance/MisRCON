import * as React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter as Router, Route, Switch } from 'react-router';
import styled from 'styled-components';

import { injectGlobalStyles } from './styles/global-styles';

import Admin from './containers/Admin';
import CreateAccount from './containers/CreateAccount';
import ForgotPassword from './containers/ForgotPassword';
import Map from './containers/Map';
// import Login from './containers/Login';
import ServerSelect from './containers/ServerSelect';
import createConnection from './db';
import { misMapActions } from './redux/mismap';
import { Dispatch } from './redux/redux-types';
import { serversActions } from './redux/servers';
import { tasksActions } from './redux/tasks';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  flex-direction: column;
`;
type Props = {
  dispatch: Dispatch;
};
type State = {};
class WrappedApp extends React.Component<Props, State> {
  public async componentDidMount() {
    injectGlobalStyles();
    await createConnection();
    await this.hydrateAllFromDatabase();
  }
  hydrateAllFromDatabase = async () => {
    const { dispatch } = this.props;
    await Promise.all([
      dispatch(serversActions.hydrateFromDbThunk()),
      dispatch(tasksActions.hydrateFromDbThunk()),
      dispatch(misMapActions.hydrateFromDbThunk())
    ]);
  };

  public render() {
    return (
      <Wrapper>
        <Router>
          <Switch>
            <Route exact path={'/'} component={Admin} />
            {/*<Route exact path={'/'} component={Login} />*/}
            <Route path={'/select'} component={ServerSelect} />
            <Route path={'/create'} component={CreateAccount} />
            <Route path={'/forgot'} component={ForgotPassword} />
            <Route path={'/admin'} component={Admin} />
          </Switch>
        </Router>
      </Wrapper>
    );
  }
}
export const App = connect()(WrappedApp);

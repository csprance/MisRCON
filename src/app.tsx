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
import Players from './containers/Players';
import ServerSelect from './containers/ServerSelect';
// import Terminal from "./containers/Terminal";
import createConnection from './db';
import { misMapActions } from './redux/mismap';
import { Dispatch } from './redux/redux-types';
import { serversActions } from './redux/servers';
import { tasksActions } from './redux/tasks';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
type Props = {
  dispatch: Dispatch;
};
type State = {};
class WrappedApp extends React.Component<Props, State> {
  public async componentDidMount() {
    await createConnection();
    await this.hydrateAllFromDatabase();
    // remote.getCurrentWindow().webContents.isDevToolsOpened();
  }

  hydrateAllFromDatabase = async () => {
    const { dispatch } = this.props;
    await Promise.all([
      dispatch(serversActions.hydrateServersFromDbThunk()),
      dispatch(tasksActions.hydrateTasksFromDbThunk()),
      dispatch(misMapActions.hydrateMapFromDbThunk())
    ]);
  };

  public render() {
    return (
      <Router>
        <Wrapper>
          <TitleBar />
          <Switch>
            {/*<Route exact path={'/'} component={AddServer} />*/}
            <Route exact path={'/'} component={ServerSelect} />
            <Route path={'/create'} component={CreateAccount} />
            <Route path={'/forgot'} component={ForgotPassword} />
            <Route path={'/admin'} component={Players} />
            <Route path={'/add'} component={AddServer} />
            <Route path={'/map'} component={withTerminal(Map)} />
          </Switch>
        </Wrapper>
      </Router>
    );
  }
}
export const App = connect()(WrappedApp);

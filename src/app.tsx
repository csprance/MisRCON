import * as React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter as Router, Route, Switch } from 'react-router';
import { Store } from 'redux';

// Functions
import withTerminal from './components/RCONTerminal/withTerminal';
import createConnection from './db';
import { injectGlobalStyles } from './styles/global-styles';

// Containers
import AddServer from './containers/AddServer';
import Admin from './containers/Admin';
import CreateAccount from './containers/CreateAccount';
import ForgotPassword from './containers/ForgotPassword';
import Map from './containers/Map';
import ServerSelect from './containers/ServerSelect';
// Redux
import { misMapActions } from './redux/mismap';
import { Dispatch } from './redux/redux-types';
import { serversActions } from './redux/servers';
import { tasksActions } from './redux/tasks';


type Props = {
  dispatch: Dispatch;
  store: Store;
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
      <Router>
        <Switch>
          <Route exact path={'/'} component={ServerSelect} />
          <Route path={'/create'} component={CreateAccount} />
          <Route path={'/forgot'} component={ForgotPassword} />
          <Route path={'/admin'} component={Admin} />
          <Route path={'/add'} component={AddServer} />
          <Route path={'/map'} component={withTerminal(Map)} />
        </Switch>
      </Router>
    );
  }
}
export const App = connect()(WrappedApp);

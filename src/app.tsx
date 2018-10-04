import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { injectGlobalStyles } from './styles/global-styles';

import Admin from './containers/Admin';
import CreateAccount from './containers/CreateAccount';
import ForgotPassword from './containers/ForgotPassword';
// import Login from './containers/Login';
import ServerSelect from './containers/ServerSelect';


export class App extends React.Component<undefined, undefined> {
  public componentDidMount() {
    injectGlobalStyles();
  }

  public render() {
    return (
      <Router>
        <Switch>
          <Route exact path={'/'} component={Admin} />
          <Route path={'/select'} component={ServerSelect} />
          <Route path={'/create'} component={CreateAccount} />
          <Route path={'/forgot'} component={ForgotPassword} />
          <Route path={'/admin'} component={Admin} />
        </Switch>
      </Router>
    );
  }
}

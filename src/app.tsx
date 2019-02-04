import * as React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter, Redirect, Route, Switch } from 'react-router';
import Layout from './components/Layout';

import { bootstrapApplicationThunk } from './redux/bootstrap';
import { Dispatch } from './redux/redux-types';
import routes from './routes';

type Props = {
  bootstrap: () => void;
};
type State = {};
class WrappedApp extends React.Component<Props, State> {
  public async componentDidMount() {
    this.props.bootstrap();
  }

  public render() {
    return (
      <MemoryRouter>
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/tasks" />} />
            {routes.map((route, idx) => (
              <Route key={idx} path={route.path} component={route.component} />
            ))}
          </Switch>
        </Layout>
      </MemoryRouter>
    );
  }
}
export const App = connect(
  () => ({}),
  (dispatch: Dispatch) => ({
    bootstrap: () => dispatch(bootstrapApplicationThunk())
  })
)(WrappedApp);

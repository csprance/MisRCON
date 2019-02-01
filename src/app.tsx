import * as React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter as Router, Route, Switch } from 'react-router';
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
      <Router>
        <Layout>
          <Switch>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                exact={idx === 0}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </Layout>
      </Router>
    );
  }
}
export const App = connect(
  () => ({}),
  (dispatch: Dispatch) => ({
    bootstrap: () => dispatch(bootstrapApplicationThunk())
  })
)(WrappedApp);

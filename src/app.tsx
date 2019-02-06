import * as React from 'react';
import { MemoryRouter, Redirect, Route, Switch } from 'react-router';
import Layout from './components/Layout';

import routes from './routes';

type Props = {};
export const App: React.FunctionComponent<Props> = () => {
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
};

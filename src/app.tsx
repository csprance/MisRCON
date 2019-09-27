import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { NodeMisrcon } from 'node-misrcon';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Redirect, Route, Switch } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from './components/Layout';
import { configureStore } from './redux/store';
import routes, { homepage } from './routes';
import { GlobalStyles } from './styles/global-styles';
import ScrollbarStyles from './styles/scrollbar-styles';
import { theme } from './styles/theme';

window.NodeMisrcon = NodeMisrcon;
const { store, persistor } = configureStore();
window.store = store;

interface Props {}
export const App: React.FunctionComponent<Props> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <ScrollbarStyles />
          <MemoryRouter>
            <Layout>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to={homepage} />}
                />
                {routes.map((route, idx) => (
                  <Route
                    key={idx}
                    path={route.path}
                    component={route.component}
                  />
                ))}
              </Switch>
            </Layout>
          </MemoryRouter>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
};

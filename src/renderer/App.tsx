import 'reflect-metadata';
import * as React from 'react';
import { MemoryRouter, Redirect, Route, Switch } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { NodeMisrcon } from 'node-misrcon';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { configureStore } from './redux/store';
import routes from './routes';
import { GlobalStyles } from './styles/global-styles';
import ScrollbarStyles from './styles/scrollbar-styles';
import { theme } from './styles/theme';
import Layout from './components/Layout';

(window as any).NodeMisrcon = NodeMisrcon;
const { store, persistor } = configureStore();

const App: React.FunctionComponent<{}> = () => {
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
                  render={() => <Redirect to="/console" />}
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

export default hot(App);

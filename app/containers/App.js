import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import '../styles/reset.global.css';
import BaseTheme from '../MisRCONBaseTheme';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(BaseTheme)}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

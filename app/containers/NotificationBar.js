/**
 * Name: NotificationBar
 * Created by chris on 4/27/2017.
 * Description:
 */
import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

import { connect } from 'react-redux';
import { red, black, orange } from '../styles/colors';

import { dismissNotify } from '../actions/notifyActions';

@connect((store) => ({
  notificationBar: store.notify
}))
export default class NotificationBar extends Component {
  dismissError = () => {
    this.props.dispatch((dispatch) => {
      dispatch(dismissNotify());
    });
  };

  
  render() {
    let color;
    if (this.props.notificationBar.warning) color = orange;
    if (this.props.notificationBar.err) color = red;
    if (this.props.notificationBar.info) color = black;
    const style = {
      backgroundColor: color
    };
    return (
      <Snackbar
        open={this.props.notificationBar.show}
        message={this.props.notificationBar.msg}
        action="Ok"
        autoHideDuration={99999}
        bodyStyle={style}
        onRequestClose={this.dismissError}
        onActionTouchTap={this.dismissError}
      />
    );
  }
}

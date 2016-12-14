/**
 * Name: EventsHeader
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description:
 */
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';



class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login"/>
    );
  }
}

class AppBarExampleComposition extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      logged: false,
    };
  }

  handleChange = (event, logged) => {
   console.log('Show API Credential Modal')
  };

  render() {
    return (
      <AppBar
        style={{background: 'transparent', position:'absolute', width: '100%', top: 0}}
        title="All Events"
        zDepth={0}
        iconElementLeft={<IconButton><RefreshIcon /></IconButton>}
        iconElementRight={<Login onTouchTap={this.handleChange}/>}
      />
    );
  }
}

export default AppBarExampleComposition;


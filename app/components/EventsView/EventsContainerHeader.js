/**
 * Name: EventsHeader
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description:
 */
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';


const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Kick"/>
    <MenuItem primaryText="Ban"/>
    <MenuItem primaryText="UnWhiteList"/>
  </IconMenu>
);

Logged.muiName = 'IconMenu';


class AppBarExampleComposition extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      logged: false,
    };
  }

  render() {
    return (
      <AppBar
        style={{background: 'transparent', position:'absolute', width: '100%', top: 0}}
        title="Mister FuzzyPants"
        zDepth={0}
        iconElementLeft={<IconButton><RefreshIcon /></IconButton>}
        iconElementRight={<Logged />}
      />
    );
  }
}

export default AppBarExampleComposition;

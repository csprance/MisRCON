/**
 * Name: EventsHeader
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description:
 */
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import NavigationIcon from 'material-ui/svg-icons/navigation/menu';

const EmittersListHeader = (props) => {
  return (
    <AppBar
      style={{background: 'transparent', position: 'absolute', width: '100%', top: 0}}
      title="All Events"
      zDepth={0}
      iconElementLeft={<IconButton onTouchTap={props.handleDrawerOpen}><NavigationIcon /></IconButton>}

    />
  );
};
// Pulled from Appbar Removing parseAll for now
// iconElementRight={<IconButton onTouchTap={props.parseAllLogs}><RefreshIcon /></IconButton>}
export default EmittersListHeader;


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
import Toggle from 'material-ui/Toggle';

import {orange, black} from '../../styles/colors';

const EventsContainerHeader = (props) => {
  const styles = {
    thumbOff: {
      backgroundColor: black,
    },
    thumbSwitched: {
      backgroundColor: orange,
    },
  };
  return (
    <AppBar
      style={{background: 'transparent', position: 'absolute', width: '100%', top: 0}}
      title={props.selected}
      zDepth={0}
      iconElementRight={<Toggle
        disabled={true}
        thumbStyle={styles.thumbOff}
        thumbSwitchedStyle={styles.thumbSwitched}
        label="Kills Only"
        defaultToggled={false}
        onToggle={props.toggleKills}
        labelPosition="right"
        style={{margin: 20}}
      />}
      iconElementLeft={props.selected === 'ALL'
        ?
        <div style={{width: 42}}></div>
        :
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
          <MenuItem onTouchTap={props.kickPlayer.bind(null, props.selected)} primaryText="Kick"/>
          <MenuItem onTouchTap={props.banPlayer.bind(null, props.selected)} primaryText="Ban"/>
          <MenuItem onTouchTap={props.unWhiteListPlayer.bind(null, props.selected)} primaryText="UnWhiteList"/>
        </IconMenu>}
    />);
};


export default EventsContainerHeader;


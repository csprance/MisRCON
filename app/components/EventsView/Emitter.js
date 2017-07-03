/**
 * Name: Emitter
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description: Contains the steamid avatar lastUpdate and lastMessage from an Emitter
 */
import React, { PropTypes } from 'react';
import SteamAvatar from '../common/SteamAvatar';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { black, white } from '../../styles/colors';

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <MoreVertIcon color={black} />
  </IconButton>
);

const Emitter = props => {
  return (
    <ListItem
      onTouchTap={props.onSelect.bind(null, props.steam)}
      leftAvatar={<SteamAvatar steam={props.steam} />}
      rightIconButton={
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem
            primaryText="Kick"
            onTouchTap={props.kickPlayer.bind(null, props.steam)}
          />
          <MenuItem
            primaryText="Ban"
            onTouchTap={props.banPlayer.bind(null, props.steam)}
          />
          <MenuItem
            primaryText="UnWhiteList"
            onTouchTap={props.unWhiteListPlayer.bind(null, props.steam)}
          />
        </IconMenu>
      }
      primaryText={props.name}
      secondaryText={props.lastMsg}
      secondaryTextLines={2}
    />
  );
};

Emitter.propTypes = {};
Emitter.defaultProps = {};

export default Emitter;

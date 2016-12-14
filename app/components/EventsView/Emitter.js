/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/14/2016
 * Description:
 */
import React, {
  PropTypes,
} from 'react';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List'
const Emitter = (props) => {
  return (
    <ListItem
      leftAvatar={<Avatar src="http://placehold.it/42x42" />}
      rightIconButton={props.rightIconMenu}
      primaryText="JenkJones"
      secondaryText="yo dude what the shit?"
      secondaryTextLines={2}
    />
  );
};

Emitter.propTypes = {};
Emitter.defaultProps = {};

export default Emitter;

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import Player from '../db/entities/Player';
import Ping from './Ping';
import PlayerAvatar from './PlayerAvatar';

const PlayerListItem: React.FunctionComponent<Player> = ({
  avatarUrl,
  steam,
  name,
  ping,
  color,
  active
}) => {
  const handleClick = () => {
    return false;
  };
  const handleContextClick = () => {
    return false;
  };

  return (
    <ListItem
      button
      onClick={() => handleClick()}
      onContextMenu={() => handleContextClick()}
    >
      <PlayerAvatar alt={name} src={avatarUrl} active={active} />
      <ListItemText
        inset
        primary={<span style={{ color }}>{name}</span>}
        secondary={steam}
      />
      <ListItemSecondaryAction>
        <Ping ping={ping} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default PlayerListItem;

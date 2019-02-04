import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import Player from '../db/entities/Player';
import PlayerMenu from './Menus/PlayerMenu';
import Ping from './Ping';
import PlayerAvatar from './PlayerAvatar';

interface Props extends Player {
  viewPlayerProfile: () => void;
  kickPlayer: () => void;
  banPlayer: () => void;
}
const PlayerListItem: React.FunctionComponent<Props> = ({
  avatarUrl,
  steam,
  name,
  ping,
  color,
  active,
  viewPlayerProfile,
  kickPlayer,
  banPlayer
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = () => {
    viewPlayerProfile();
  };

  const handleContextClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closePlayerMenu = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick} onContextMenu={handleContextClick}>
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
      <PlayerMenu
        banPlayer={banPlayer}
        kickPlayer={kickPlayer}
        anchorEl={anchorEl}
        closePlayerMenu={closePlayerMenu}
        viewPlayerProfile={viewPlayerProfile}
      />
    </React.Fragment>
  );
};
export default PlayerListItem;

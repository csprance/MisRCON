import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';

import { openExternally } from '../lib/utils';
import { Player } from '../redux/players/types';
import PlayerMenu from './Menus/PlayerMenu';
import Ping from './Ping';
import PlayerAvatar from './PlayerAvatar';
import PlayerName from './PlayerName';

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
          primary={
            <PlayerName active={active} color={color}>
              {name}
            </PlayerName>
          }
          secondary={steam}
        />
        <ListItemSecondaryAction>
          <Ping ping={ping} />
        </ListItemSecondaryAction>
      </ListItem>
      <PlayerMenu
        openSteamCommunity={() =>
          openExternally('https://steamcommunity.com/profiles/' + steam)
        }
        openSteamRep={() =>
          openExternally('https://steamrep.com/search?q=' + steam)
        }
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

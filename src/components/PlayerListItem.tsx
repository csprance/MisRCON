import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
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

  const handleClick = () => viewPlayerProfile();
  const handleContextClick = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const closePlayerMenu = () => setAnchorEl(null);

  return (
    <>
      <ListItem button onClick={handleClick} onContextMenu={handleContextClick}>
        <PlayerAvatar alt={name} src={avatarUrl} active={active} />
        <ListItemText
          // inset
          primary={
            <PlayerName active={active} color={color}>
              {name.length > 15 ? (
                <Tooltip title={name}>
                  <a>{name.substring(0, 12) + '...'}</a>
                </Tooltip>
              ) : (
                name
              )}
            </PlayerName>
          }
          secondary={steam}
        />
        <ListItemSecondaryAction>
          <Tooltip title={`Ping: ${ping}`}>
            <a>
              <Ping ping={ping} />
            </a>
          </Tooltip>
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
    </>
  );
};

export default PlayerListItem;

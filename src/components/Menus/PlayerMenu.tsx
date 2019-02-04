// This is the context menu you see when you right click on a player in the player list
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';

type Props = {
  anchorEl: any;
  banPlayer: () => void;
  closePlayerMenu: () => void;
  kickPlayer: () => void;
  viewPlayerProfile: () => void;
};
const ServerPropertiesMenu: React.FunctionComponent<Props> = ({
  anchorEl,
  closePlayerMenu,
  viewPlayerProfile,
  banPlayer,
  kickPlayer
}) => {
  const handleViewProfileClicked = () => {
    viewPlayerProfile();
    closePlayerMenu();
  };
  const handleBanPlayerClicked = () => {
    banPlayer();
    closePlayerMenu();
  };
  const handleKickPlayerClicked = () => {
    kickPlayer();
    closePlayerMenu();
  };
  return (
    <Menu
      disableAutoFocusItem
      id="player-menu"
      onClick={(e: any) => e.preventDefault()}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={closePlayerMenu}
    >
      <MenuItem dense onClick={handleViewProfileClicked}>
        View Profile
      </MenuItem>
      <MenuItem dense onClick={handleKickPlayerClicked}>
        Kick Player
      </MenuItem>
      <MenuItem dense onClick={handleBanPlayerClicked}>
        Ban Player
      </MenuItem>
      <MenuItem disabled dense onClick={closePlayerMenu}>
        Add Player to Faction
      </MenuItem>
    </Menu>
  );
};

export default ServerPropertiesMenu;

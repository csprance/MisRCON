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
  openSteamCommunity: () => void;
  openSteamRep: () => void;
};
const ServerPropertiesMenu: React.FunctionComponent<Props> = ({
  anchorEl,
  closePlayerMenu,
  viewPlayerProfile,
  banPlayer,
  kickPlayer,
  openSteamCommunity,
  openSteamRep
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
  const handleSteamRepClicked = () => {
    openSteamRep();
    closePlayerMenu();
  };
  const handleSteamCommunityClicked = () => {
    openSteamCommunity();
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
      <MenuItem dense onClick={handleSteamCommunityClicked}>
        Steam Community
      </MenuItem>
      <MenuItem dense onClick={handleSteamRepClicked}>
        Steam Rep
      </MenuItem>
      <MenuItem disabled dense onClick={closePlayerMenu}>
        Add to Faction
      </MenuItem>
    </Menu>
  );
};

export default ServerPropertiesMenu;

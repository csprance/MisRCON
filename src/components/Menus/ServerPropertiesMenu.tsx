import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';

type Props = {
  anchorEl: any;
  handleClose: () => void;
  deleteServer: () => void;
  toggleEditServerDialog: () => void;
  refreshServerData: () => void;
};
const ServerPropertiesMenu: React.FunctionComponent<Props> = ({
  anchorEl,
  handleClose,
  toggleEditServerDialog,
  refreshServerData,
  deleteServer
}) => {
  const handleDeleteClick = () => {
    deleteServer();
    handleClose();
  };

  const handleRefreshServerData = () => {
    refreshServerData();
    handleClose();
  };

  const handleEditServerClicked = () => {
    toggleEditServerDialog();
    handleClose();
  };

  return (
    <Menu
      id="server-properties-menu"
      disableAutoFocusItem
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      style={{ marginLeft: 50, marginTop: 50, zIndex: 1600 }}
      onClose={handleClose}
    >
      <MenuItem dense onClick={handleEditServerClicked}>
        Edit Server
      </MenuItem>
      <MenuItem dense onClick={handleDeleteClick}>
        Delete Server
      </MenuItem>
      <MenuItem dense onClick={handleRefreshServerData}>
        Refresh Server Data
      </MenuItem>
    </Menu>
  );
};

export default ServerPropertiesMenu;

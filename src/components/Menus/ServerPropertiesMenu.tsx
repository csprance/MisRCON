import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';

type Props = {
  anchorEl: any;
  handleClose: () => void;
  deleteServer: () => void;
  refreshServerData: () => void;
};
const ServerPropertiesMenu: React.FunctionComponent<Props> = ({
  anchorEl,
  handleClose,
  refreshServerData,
  deleteServer
}) => {
  const handleDeleteClick = () => {
    deleteServer();
    handleClose();
  };

  const handleRefreshServerData = ()=> {
    refreshServerData()
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
      <MenuItem disabled dense onClick={handleClose}>Edit Server</MenuItem>
      <MenuItem dense onClick={handleDeleteClick}>Delete Server</MenuItem>
      <MenuItem dense onClick={handleRefreshServerData}>Refresh Server Data</MenuItem>
    </Menu>
  );
};

export default ServerPropertiesMenu;

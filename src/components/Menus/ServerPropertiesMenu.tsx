import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';

type Props = {
  anchorEl: any;
  handleClose: () => void;
  deleteServer: () => void;
};
const ServerPropertiesMenu: React.FunctionComponent<Props> = ({
  anchorEl,
  handleClose,
  deleteServer
}) => {
  const handleDeleteClick = () => {
    deleteServer();
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
      <MenuItem dense onClick={handleClose}>Edit Server</MenuItem>
      <MenuItem dense onClick={handleDeleteClick}>Delete Server</MenuItem>
      <MenuItem dense onClick={handleClose}>Refresh Server Data</MenuItem>
    </Menu>
  );
};

export default ServerPropertiesMenu;
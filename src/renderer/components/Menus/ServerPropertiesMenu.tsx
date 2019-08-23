import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';
import ConfirmationDialog from '../ConfirmationDialog';

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
  const [state, setState] = React.useState({
    title: '',
    description: '',
    open: false,
    onConfirm: () => console.log('onConfirm'),
    onCancel: () => console.log('onCancel')
  });

  const handleDeleteClick = () => {
    setState({
      title: 'Delete Server?',
      description: ' Are you sure you want to delete this server?',
      open: true,
      onConfirm: () => {
        deleteServer();
        setState({ ...state, open: false });
      },
      onCancel: () => {
        setState({ ...state, open: false });
      }
    });
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
    <>
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
      {state.open ? (
        // Confirmation Dialog for Delete Server
        <ConfirmationDialog
          onCancel={state.onCancel}
          onConfirm={state.onConfirm}
          title={state.title}
          description={state.description}
        />
      ) : null}
    </>
  );
};

export default ServerPropertiesMenu;

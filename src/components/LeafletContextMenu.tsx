/**
 * Name: AtlasMapContextMenu
 * Created by chris on 4/23/2017.
 * Description:
 */
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';

interface Props {
  open: boolean;
  anchorEl: any;
  addMarker: () => void;
  closeContextMenu: () => void;
}
interface State {}
class AtlasMapContextMenu extends React.Component<Props, State> {
  render() {
    const { open, anchorEl, closeContextMenu, addMarker } = this.props;
    return (
      <Menu anchorEl={anchorEl} open={open} onClose={closeContextMenu}>
        <MenuItem onClick={addMarker}>Add Marker</MenuItem>
      </Menu>
    );
  }
}

export default AtlasMapContextMenu;

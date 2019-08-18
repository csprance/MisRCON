import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';

interface Props {
  open: boolean;
  anchorEl: any;
  addMarker: () => void;
  closeContextMenu: () => void;
}
const LeafletContextMenu: React.FunctionComponent<Props> = ({
  open,
  anchorEl,
  closeContextMenu,
  addMarker
}) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={closeContextMenu}>
      <MenuItem onClick={addMarker}>Add Marker</MenuItem>
      <MenuItem disabled onClick={addMarker}>
        Add Faction Spawn Point
      </MenuItem>
    </Menu>
  );
};

export default LeafletContextMenu;

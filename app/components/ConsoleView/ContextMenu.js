/**
 * Name: ContextMenu
 * Created by chris on 4/23/2017.
 * Description:
 */
import React from 'react';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';
import { clipboard } from 'electron';


const ContextMenu = (props) => {
  
  const paste = () => {
    props.console.paste({
      clipboardData: {
        getData: () => (clipboard.readText())
      },
      preventDefault: () => {
      }
    });
    props.closeContextMenu();
  };


  const copy = () => {
    clipboard.writeText(window.getSelection().toString());
    props.closeContextMenu();
  };


  return (
    <Popover
      open={props.open}
      anchorEl={props.anchorEl}
      onRequestClose={props.closeContextMenu}
    >
      <Menu>
        <MenuItem primaryText="Copy" onTouchTap={copy} />
        <MenuItem primaryText="Paste" onTouchTap={paste} />
        <MenuItem primaryText="Clear Console" onTouchTap={props.clearConsole} />
      </Menu>
    </Popover>
  );
};


export default ContextMenu;

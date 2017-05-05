/**
 * Name: ContextMenu
 * Created by chris on 4/23/2017.
 * Description:
 */
import React, { Component } from 'react';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';
import { clipboard } from 'electron';

class ContextMenu extends Component {

  paste = () => {
    this.props.console.paste({
      clipboardData: {
        getData: () => (clipboard.readText())
      },
      preventDefault: () => {
      }
    });
    this.props.closeContextMenu();
  };

  copy = () => {
    clipboard.writeText(window.getSelection().toString());
    this.props.closeContextMenu();
  };

  render() {
    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        onRequestClose={this.props.closeContextMenu}
      >
        <Menu>
          <MenuItem primaryText="Copy" onTouchTap={this.copy} />
          <MenuItem primaryText="Paste" onTouchTap={this.paste} />
        </Menu>
      </Popover>
    );
  }
}


export default ContextMenu;

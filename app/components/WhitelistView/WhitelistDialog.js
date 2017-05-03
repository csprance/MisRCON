/**
 * Name: Whitelist Dialog
 * Author: Chrissprance
 * Creation Date: 12/13/2016
 * Description: contains the fields needed to add a steamid to the whitelist
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const WhitelistDialog = (props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      onTouchTap={props.actionCancel}
    />,
    <FlatButton
      label="Submit"
      secondary
      onTouchTap={props.actionSubmit}
    />
  ];

  return (
    <Dialog
      title="Add To WhiteList"
      actions={actions}
      modal={false}
      onRequestClose={props.actionCancel}
      open={props.open}
    >
      <TextField
        floatingLabelText="Steam ID to Whitelist"
        value={props.steamID}
        onChange={props.updateSteamID}
      />
    </Dialog>
  );
};


WhitelistDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  updateSteamID: React.PropTypes.func.isRequired,
  steamID: React.PropTypes.string.isRequired,
  actionSubmit: React.PropTypes.func.isRequired,
  actionCancel: React.PropTypes.func.isRequired
};

export default WhitelistDialog;

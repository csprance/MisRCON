/**
 * Name: Bans Dialog
 * Author: Chrissprance
 * Creation Date: 12/13/2016
 * Description: contains the fields needed to add a steamid to the banlist
 */
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const BanDialog = (props) => {
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
      title="Add To Ban List"
      actions={actions}
      modal={false}
      onRequestClose={props.actionCancel}
      open={props.open}
    >
      <TextField
        floatingLabelText="Steam ID to Ban"
        value={props.steamID}
        onChange={props.updateSteamID}
      />
    </Dialog>
  );
};

BanDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  updateSteamID: PropTypes.func.isRequired,
  steamID: PropTypes.string.isRequired,
  actionSubmit: PropTypes.func.isRequired,
  actionCancel: PropTypes.func.isRequired
};

export default BanDialog;

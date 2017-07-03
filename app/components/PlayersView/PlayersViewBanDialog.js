/**
 * Name: PlayersViewBanDialog
 * Author: Chrissprance
 * Creation Date: 12/10/2016
 * Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const PlayersViewBanDialog = props => {
  const actions = [
    <FlatButton label="Cancel" onTouchTap={props.actionCancel} />,
    <FlatButton label="Submit" secondary onTouchTap={props.actionSubmit} />
  ];

  return (
    <Dialog
      title="Ban Player"
      actions={actions}
      modal={false}
      onRequestClose={props.actionCancel}
      open={props.open}
    >
      <TextField
        id={`${props.steamIDToBan}_ban_input`}
        floatingLabelText="Ban Reason"
        value={props.banReason}
        onChange={props.updateBanReason}
      />
      <br />
      Are you sure you want to ban {props.steamIDToBan}?
    </Dialog>
  );
};

PlayersViewBanDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  banReason: PropTypes.string.isRequired,
  updateBanReason: PropTypes.func.isRequired,
  steamIDToBan: PropTypes.string.isRequired,
  actionSubmit: PropTypes.func.isRequired,
  actionCancel: PropTypes.func.isRequired
};

export default PlayersViewBanDialog;

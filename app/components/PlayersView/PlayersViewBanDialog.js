/**
 * Name: PlayersViewBanDialog
 * Author: Chrissprance
 * Creation Date: 12/10/2016
 * Description:
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const PlayersViewBanDialog = (props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      onTouchTap={props.actionCancel}/>,
    <FlatButton
      label="Submit"
      secondary={true}
      onTouchTap={props.actionSubmit}/>
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
        id={props.steamIDToBan + '_ban_input'}
        floatingLabelText="Ban Reason"
        value={props.banReason}
        onChange={props.updateBanReason}
      />
      <br/>
      Are you sure you want to ban {props.steamIDToBan}?
    </Dialog>
  );
};

PlayersViewBanDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  banReason: React.PropTypes.string.isRequired,
  updateBanReason: React.PropTypes.func.isRequired,
  steamIDToBan: React.PropTypes.string.isRequired,
  actionSubmit: React.PropTypes.func.isRequired,
  actionCancel: React.PropTypes.func.isRequired
};

export default PlayersViewBanDialog;



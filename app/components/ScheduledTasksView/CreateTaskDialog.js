import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const CreateTaskDialog = (props) => {
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
      title="Create New Scheduled Task"
      actions={actions}
      modal={false}
      onRequestClose={props.actionCancel}
      open={props.open}
    >
      {props.children}
    </Dialog>
  );
};

CreateTaskDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  actionSubmit: React.PropTypes.func.isRequired,
  actionCancel: React.PropTypes.func.isRequired
};

export default CreateTaskDialog;



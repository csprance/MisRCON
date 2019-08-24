import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';

export interface Props {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const ConfirmationDialog: React.FunctionComponent<Props> = ({
  description,
  title,
  onCancel,
  onConfirm
}) => {
  function handleCancel() {
    onCancel();
  }

  function handleConfirm() {
    onConfirm();
  }

  return (
    <Dialog
      open={true}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Nope.
        </Button>
        <Button onClick={handleConfirm} color="primary" variant={'contained'} autoFocus>
          Yep!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

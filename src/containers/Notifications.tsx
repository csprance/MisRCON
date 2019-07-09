import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { connect } from 'react-redux';

import { notificationsSelector } from '../redux/notifications/selectors';
import { NotificationsState } from '../redux/notifications/types';
import { Dispatch, RootState } from '../redux/redux-types';
import { darkDarkBlack } from '../styles/colors';
interface Props {}
interface ReduxProps {
  notifications: NotificationsState;
}
const Notifications: React.FunctionComponent<Props & ReduxProps> = ({
  notifications
}) => {
  const colors = {
    error: '#ff5544',
    info: darkDarkBlack,
    success: '#31a246'
  };
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    _event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  if (notifications.length === 0) {
    return <></>;
  }
  return (
    <>
      {notifications.map(notification => (
        <Snackbar
          key={notification.id}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={open}
          autoHideDuration={16000}
          onClose={handleClose}
          ContentProps={{
            style: { backgroundColor: colors[notification.variant] },
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{notification.content}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      ))}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  notifications: notificationsSelector(state)
});
const mapDispatchToProps = (_dispatch: Dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

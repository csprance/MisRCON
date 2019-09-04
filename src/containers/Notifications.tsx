import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeNotification } from '../redux/notifications/actions';
import { showingNotificationsSelectors } from '../redux/notifications/selectors';
import { bg5 } from '../styles/colors';

interface Props {}
const Notifications: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(showingNotificationsSelectors);
  const handleCloseNotification = (id: number) =>
    dispatch(closeNotification(id));

  const colors = {
    error: '#ff5544',
    info: bg5,
    success: '#31a246'
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
          open={notification.open}
          autoHideDuration={6000}
          onClose={(_e, reason) => {
            if (reason === 'clickaway') {
              return false;
            }
            handleCloseNotification(notification.id);
            return true;
          }}
          ContentProps={{
            style: { backgroundColor: colors[notification.variant] },
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{notification.content}</span>}
          action={[
            <IconButton
              onClick={() => handleCloseNotification(notification.id)}
              key="close"
              aria-label="Close"
              color="inherit"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      ))}
    </>
  );
};

export default Notifications;

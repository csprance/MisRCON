import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { connect } from 'react-redux';

import { closeNotification } from '../redux/notifications/actions';
import { notificationsSelector } from '../redux/notifications/selectors';
import { NotificationsState } from '../redux/notifications/types';
import { Dispatch, RootState } from '../redux/redux-types';
import { bg5 } from '../styles/colors';

interface Props {}
interface ReduxProps {
  notifications: NotificationsState;
  handleCloseNotification: (id: number) => void;
}
const Notifications: React.FunctionComponent<Props & ReduxProps> = ({
  notifications,
  handleCloseNotification
}) => {
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
            <IconButton key="close" aria-label="Close" color="inherit">
              <CloseIcon
                onClick={() => handleCloseNotification(notification.id)}
              />
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
const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleCloseNotification: (id: number) => dispatch(closeNotification(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

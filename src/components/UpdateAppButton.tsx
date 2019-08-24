import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import UpdateIcon from '@material-ui/icons/Update';
import * as React from 'react';
import { green } from '../styles/colors';

interface Props {
  onClick: () => void;
}
const UpdateAppButton: React.FunctionComponent<Props> = ({ onClick }) => {
  return (
    <Tooltip title={'Update Available!'}>
      <IconButton href={'#'} onClick={onClick}>
        <UpdateIcon style={{ color: green }} />
      </IconButton>
    </Tooltip>
  );
};

export default UpdateAppButton;

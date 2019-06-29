import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
import * as React from 'react';

type Props = {
  onClick: () => void;
};
const ToggleSettingsButton: React.FunctionComponent<Props> = ({
  onClick
}) => {
  return (
    <Tooltip title={'Settings'}>
      <IconButton onClick={onClick}>
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ToggleSettingsButton;

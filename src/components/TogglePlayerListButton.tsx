import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PlayersIcon from '@material-ui/icons/SupervisorAccount';
import * as React from 'react';

type Props = {
  onClick: () => void;
};
const TogglePlayerListButton: React.FunctionComponent<Props> = ({
  onClick
}) => {
  return (
    <Tooltip title={'Player List'}>
      <IconButton href={'#'} onClick={onClick}>
        <PlayersIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TogglePlayerListButton;

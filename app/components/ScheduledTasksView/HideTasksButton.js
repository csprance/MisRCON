import React from 'react';
import IconButton from 'material-ui/IconButton';
import ScheduleIcon from 'material-ui/svg-icons/action/schedule';

import { orange } from '../../styles/colors';

const HideTasksButton = props => {
  return (
    <IconButton
      touch
      tooltipPosition={'bottom-left'}
      tooltip={'Hide Tasks'}
      style={{ marginRight: 10 }}
      onTouchTap={props.onTouchTap}
    >
      <ScheduleIcon color={orange} />
    </IconButton>
  );
};

export default HideTasksButton;

import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { orange } from '../../styles/colors';

const AddTaskButton = (props) => {
  return (
    <IconButton
      touch
      tooltipPosition={'bottom-left'}
      tooltip={'Add Task'}
      style={{marginRight: 10}}
      onTouchTap={props.onTouchTap}
    >
      <ContentAdd color={orange} />
    </IconButton>
  );
};

export default AddTaskButton;

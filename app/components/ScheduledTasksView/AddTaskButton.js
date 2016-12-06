import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddTaskButton = (props) => {
  return (
    <FloatingActionButton
      style={{marginRight: 10}}
      secondary={true}
      onTouchTap={props.onTouchTap}>
      <ContentAdd />
    </FloatingActionButton>

  );
};

export default AddTaskButton;

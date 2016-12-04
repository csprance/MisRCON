import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const AddTaskButton = (props) => {
  return (
    <FloatingActionButton
      style={{position: 'absolute', right: 10, top: 8}}
      secondary={true}
      onTouchTap={props.onTouchTap}>
      <ContentAdd />
    </FloatingActionButton>

  );
};

export default AddTaskButton;

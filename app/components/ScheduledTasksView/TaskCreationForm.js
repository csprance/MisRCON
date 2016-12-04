import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';

const TaskCreationForm = (props) => {
  return (
    <Container>
      <TextField
        value={props.taskName}
        hintText="Task Name"
        onChange={props.onNameChanged}/>
      <TimePicker
        value={props.taskTime}
        hintText="Task Run Time"
        onChange={props.onTimeChanged}/>
      <TextField
        value={props.taskCommand}
        hintText="Command to execute"
        onChange={props.onCommandChanged}/>
    </Container>
  );
};

TaskCreationForm.propTypes = {
  taskTime: React.PropTypes.object.isRequired,
  taskName: React.PropTypes.string.isRequired,
  taskCommand: React.PropTypes.string.isRequired,
  onTimeChanged: React.PropTypes.func.isRequired,
  onNameChanged: React.PropTypes.func.isRequired,
  onCommandChanged: React.PropTypes.func.isRequired,
};
export default TaskCreationForm;


//////////////////
// styles
//////////////////
const Container = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  height:100%;
  justify-content:center;
  align-items:center;
`;

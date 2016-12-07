import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';

import {white} from '../../styles/colors';

const TaskCreationForm = (props) => {
  return (
    <Tabs>
      <Tab label="Specific Date" data-route="SPECIFIC" onActive={props.onTypeChanged}>
        <Container>
          <TextField
            style={inputStyles}
            value={props.taskName}
            floatingLabelText="Task Name"
            floatingLabelStyle={{color: white}}
            errorText={props.taskNameError}
            onChange={props.onNameChanged}/>
          <TimePicker
            style={inputStyles}
            value={props.taskTime}
            floatingLabelText="Task Run Time"
            floatingLabelStyle={{color: white}}
            onChange={props.onTimeChanged}/>
          <DatePicker
            style={inputStyles}
            value={props.taskDate}
            floatingLabelText="Task Run Date"
            floatingLabelStyle={{color: white}}
            onChange={props.onDateChanged}/>
          <TextField
            style={inputStyles}
            value={props.taskCommand}
            floatingLabelText="Command to execute"
            floatingLabelStyle={{color: white}}
            onChange={props.onCommandChanged}/>
        </Container>
      </Tab>
      <Tab label="Recurring" data-route="RECURRING" onActive={props.onTypeChanged}>
        <Container>
          <TextField
            style={inputStyles}
            value={props.taskName}
            floatingLabelText="Task Name"
            floatingLabelStyle={{color: white}}
            errorText={props.taskNameError}
            onChange={props.onNameChanged}/>
          <TextField
            style={inputStyles}
            value={props.taskCronString}
            floatingLabelText="Cron String [ss mm hh dd month dayofweek]"
            floatingLabelStyle={{color: white}}
            onChange={props.onCronStringChanged}/>
          <TextField
            style={inputStyles}
            value={props.taskCommand}
            floatingLabelText="Command to execute"
            floatingLabelStyle={{color: white}}
            onChange={props.onCommandChanged}/>
        </Container>
      </Tab>
    </Tabs>
  );
};

TaskCreationForm.propTypes = {
  taskTime: React.PropTypes.object,
  taskDate: React.PropTypes.object,
  taskCronString: React.PropTypes.string,
  taskName: React.PropTypes.string.isRequired,
  taskNameError: React.PropTypes.string.isRequired,
  taskCommand: React.PropTypes.string.isRequired,
  onTimeChanged: React.PropTypes.func.isRequired,
  onNameChanged: React.PropTypes.func.isRequired,
  onCommandChanged: React.PropTypes.func.isRequired,
  onCronStringChanged: React.PropTypes.func.isRequired,
  onTypeChanged: React.PropTypes.func.isRequired,
  onDateChanged: React.PropTypes.func.isRequired,
};
export default TaskCreationForm;


//////////////////
// styles
//////////////////
const inputStyles = {width: '100%'};
const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

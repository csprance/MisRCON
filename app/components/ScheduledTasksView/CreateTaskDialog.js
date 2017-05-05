//TODO: validation on cron string
//TODO: validation on command

import React, { Component } from 'react';
import { shell } from 'electron';
import { Tabs, Tab } from 'material-ui/Tabs';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux';
import * as taskActions from '../../actions/scheduledTasksActions';
import * as utils from '../../utils/utils';

import { white } from '../../styles/colors';

@connect((store) => ({
  credentials: store.credentials,
  tasks: store.tasks,
  server: store.server
}))
class CreateTaskDialog extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      nameError: '',
      time: new Date(),
      date: new Date(),
      command: '',
      type: 'SPECIFIC',
      cronString: '',
      runs: 0,
    };
  }


  handleClick = () => {
    utils.handleClick('https://crontab.guru/');
  };

  closeDialog = () => {
    this.props.dispatch(taskActions.closeCreateTaskDialog());
  };

  createTask = () => {
    this.props.dispatch(taskActions.addTaskToState({
      ...this.props.credentials.active,
      ...this.state,
      serverName: this.props.server.status.name
    }));
    this.closeDialog();
  };


  updateTaskTime = (e, time) => {
    this.setState({
      time
    });
  };


  updateTaskCommand = (e) => {
    this.setState({
      command: e.target.value,
    });
  };


  updateTaskName = (e) => {
    this.setState({
      name: e.target.value,
      nameError: ''
    });
  };


  updateTaskDate = (e, date) => {
    this.setState({
      date
    });
  };


  updateTaskCronString = (e) => {
    this.setState({
      cronString: e.target.value
    });
  };


  updateTaskType = (tab) => {
    this.setState({
      type: tab.props['data-route']
    });
  };


  render() {
    const actions = [
      <FlatButton label="Cancel" onTouchTap={this.closeDialog} />,
      <FlatButton label="Submit" secondary onTouchTap={this.createTask} />
    ];
    return (
      <Dialog
        title="Create New Scheduled Task"
        actions={actions}
        modal={false}
        onRequestClose={this.props.actionCancel}
        open={this.props.tasks.open}
      >
        <Tabs>
          <Tab label="Specific Date" data-route="SPECIFIC" onActive={this.updateTaskType} >
            <Container>
              <TextField
                style={inputStyles}
                value={this.state.name}
                floatingLabelText="Task Name"
                floatingLabelStyle={{color: white}}
                errorText={this.state.nameError}
                onChange={this.updateTaskName}
              />
              <TimePicker
                style={inputStyles}
                value={this.state.time}
                floatingLabelText="Task Run Time"
                floatingLabelStyle={{color: white}}
                onChange={this.updateTaskTime}
              />
              <DatePicker
                style={inputStyles}
                value={this.state.date}
                floatingLabelText="Task Run Date"
                floatingLabelStyle={{color: white}}
                onChange={this.updateTaskDate}
              />
              <TextField
                style={inputStyles}
                value={this.state.command}
                floatingLabelText="Command to execute"
                floatingLabelStyle={{color: white}}
                onChange={this.updateTaskCommand}
              />
            </Container>
          </Tab>
          <Tab label="Recurring" data-route="RECURRING" onActive={this.updateTaskType} >
            <Container>
              <TextField
                style={inputStyles}
                value={this.state.name}
                floatingLabelText="Task Name"
                floatingLabelStyle={{color: white}}
                errorText={this.state.nameError}
                onChange={this.updateTaskName}
              />
              <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                <TextField
                  style={{flexGrow: 9}}
                  value={this.state.cronString}
                  floatingLabelText="Cron String [ss mm hh dd month dayofweek]"
                  floatingLabelStyle={{color: white}}
                  onChange={this.updateTaskCronString}
                />
                <IconButton tooltip="WTF is a Cron String?" style={{flexGrow: 1}} onTouchTap={this.handleClick} >
                  <HelpIcon />
                </IconButton>
              </div>
              <TextField
                style={inputStyles}
                value={this.state.command}
                floatingLabelText="Command to execute"
                floatingLabelStyle={{color: white}}
                onChange={this.updateTaskCommand}
              />
            </Container>
          </Tab>
        </Tabs>
      </Dialog>
    );
  }
}

const inputStyles = {width: '100%'};

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default CreateTaskDialog;

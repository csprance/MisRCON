import React, {Component} from 'react';
import styled from 'styled-components';

import {black} from '../../styles/colors';
import TaskCard from './TaskCard';
import AddTasksButton from './AddTaskButton';
import CreateTaskDialog from './CreateTaskDialog';
import TaskCreationForm from './TaskCreationForm';

class ScheduledTasksView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      tasks: this.getTasksFromLocalStorage(),
      taskTime: new Date(),
      taskCommand: '',
      taskName: ''
    };
  }

  getTasksFromLocalStorage = () => {
    return ([
      <TaskCard taskName="Example Task1"
                deleteTask={this.deleteTask}
                taskTime={new Date()}
                taskCommand="sv_say This is a test1"
                key={new Date().toTimeString() + "Example Task1" + "sv_say This is a test1" }/>,
      <TaskCard taskName="Example Task2"
                deleteTask={this.deleteTask}
                taskTime={new Date()}
                taskCommand="sv_say This is a test2"
                key={new Date().toTimeString() + "Example Task2" + "sv_say This is a test2" }/>,
      <TaskCard taskName="Example Task3"
                deleteTask={this.deleteTask}
                taskTime={new Date()}
                taskCommand="sv_say This is a test3"
                key={new Date().toTimeString() + "Example Task3" + "sv_say This is a test3" }/>,
      <TaskCard taskName="Example Task4"
                deleteTask={this.deleteTask}
                taskTime={new Date()}
                taskCommand="sv_say This is a test4"
                key={new Date().toTimeString() + "Example Task4" + "sv_say This is a test4" }/>

    ]);
  };

  deleteTask = (name, time, command) => {
    //TODO: remove task from localStorage
    this.setState({
      tasks: this.state.tasks.filter((itm) => {
        return itm.key !== time.toTimeString() + name + command
      }),
    });
  };

  openTaskDialog = () => {
    this.setState({open: true});
  };

  closeTaskDialog = () => {
    this.setState({open: false});
  };

  addNewTask = () => {
    //TODO: Add task to localStorage
    this.closeTaskDialog();
    this.setState({
      tasks: this.state.tasks.concat([
        <TaskCard taskName={this.state.taskName}
                  deleteTask={this.deleteTask}
                  taskTime={this.state.taskTime}
                  taskCommand={this.state.taskCommand}
                  key={this.state.taskTime.toTimeString() + this.state.taskName + this.state.taskCommand}/>]),
      taskTime: new Date(),
      taskCommand: '',
      taskName: ''
    });
  };

  updateTaskTime = (e, time) => {
    this.setState({
      taskTime: time,
    });
  };

  updateTaskCommand = (e) => {
    this.setState({
      taskCommand: e.target.value,
    });
  };

  updateTaskName = (e) => {
    this.setState({
      taskName: e.target.value,
    });
  };


  render() {
    return (
      <Wrapper>
        <HeaderBar>
          SCHEDULED TASKS
          <AddTasksButton onTouchTap={this.openTaskDialog}/>
        </HeaderBar>
        <TaskContainer>
          {this.state.tasks}
        </TaskContainer>
        <CreateTaskDialog open={this.state.open} actionSubmit={this.addNewTask} actionCancel={this.closeTaskDialog}>
          <TaskCreationForm
            taskTime={this.state.taskTime}
            taskName={this.state.taskName}
            taskCommand={this.state.taskCommand}
            onTimeChanged={this.updateTaskTime}
            onNameChanged={this.updateTaskName}
            onCommandChanged={this.updateTaskCommand}
          />
        </CreateTaskDialog>
      </Wrapper>
    );
  }
}

export default ScheduledTasksView;

const Wrapper = styled.div`
  max-width:450px;
  flex-direction:column;
  align-items:stretch;
  display:flex;
  flex-grow: 1;
`;

const TaskContainer = styled.div`
  box-sizing: border-box;
  flex-grow:1;
  display: flex;
  flex-direction:column;
  justify-content:flex-start;
  overflow-y:auto;
  padding: 10px;
`;

const HeaderBar = styled.div`
  min-height:72px;
  max-height: 72px;
  flex-grow: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${black};
`;

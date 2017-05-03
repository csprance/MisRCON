import React, { Component } from 'react';
import styled from 'styled-components';
import store from 'store';
import parse from 'date-fns/parse';

import { black } from '../../styles/colors';
import TaskCard from './TaskCard';
import AddTasksButton from './AddTaskButton';
import CreateTaskDialog from './CreateTaskDialog';
import TaskCreationForm from './TaskCreationForm';

class ScheduledTasksView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,                            // is the CreateTaskDialog dialog open
      tasks: this.getTasksFromLocalStorage(), // the array containing all the tasks object data
      taskTime: new Date(),                   // the Date() of the task for the time
      taskDate: new Date(),                   // a string representation of the date
      taskType: 'SPECIFIC',                   // the type of task RECURRING or SPECIFIC
      taskCronString: '',                     // the cron string
      taskName: '',                           // the name of the task
      taskCommand: '',                        // the command sent to the server
      taskKey: '',                            // the key of the task
      taskNameError: ''                       // the error text that shows up if the taskName is taken
    };

  }

  ////////////////////////////////////////////////////////////
  /**
   * Gets task from the localStorage if there is any tasks
   * if not it returns an empty array
   * @return {array}       Array containing tasks
   */
  getTasksFromLocalStorage = () => {
    //  Fetch stored tasks from localStorage
    return store.get('savedTasks') !== undefined ? store.get('savedTasks') : [];
  };

  ////////////////////////////////////////////////////////////
  /**
   * Filters this.state.tasks and removes an element given a taskName
   * @param: {string}  name  the name of the task
   */
  deleteTask = (name) => {
    // filter it out of tasks array
    const newArray = this.state.tasks.filter((task) => {
      return task.taskName !== name;
    });

    // replace tasks state with new array
    this.setState({
      tasks: newArray
    });

    // replace the localStorage with the newArray
    store.set('savedTasks', newArray);
  };

  ////////////////////////////////////////////////////////////
  /**
   * Adds a task to this.state.tasks as long as there is not an existing
   * object with the same taskName
   */
  addTask = () => {
    // if taskName doesn't exist in state.tasks array
    if (this.state.tasks.filter((e) => e.taskName == this.state.taskName).length == 0) {
      this.closeTaskDialog();

      // Add task to this.state.tasks and localStorage
      const newTasks = this.state.tasks.concat(
        [{
          taskName: this.state.taskName,
          taskCronString: this.state.taskCronString,
          taskDate: this.state.taskDate,
          taskTime: this.state.taskTime,
          taskType: this.state.taskType,
          taskCommand: this.state.taskCommand,
          taskKey: this.state.taskKey
        }]);

      // TODO: We need a reset state method here to clean up the form
      this.setState({
        tasks: newTasks,
        taskType: 'SPECIFIC' // set it back here because the tab defaults to specific on dialog open
      });

      // replace the localStorage with the newTasks array
      store.set('savedTasks', newTasks);
    }
    else {
      // spit out an error in the dialog
      this.setState({
        taskNameError: 'Name already exists please use another name....'
      });
    }
  };

  ////////////////////////////////////////////////////////////
  /**
   * Shows CreateTaskDialog by setting
   * this.state.open = true
   */
  openTaskDialog = () => {
    this.setState({open: true});
  };


  ////////////////////////////////////////////////////////////
  closeTaskDialog = () => {
    this.setState({open: false});
  };


  ////////////////////////////////////////////////////////////
  updateTaskTime = (e, time) => {
    this.setState({
      taskTime: time
    });
  };

  ////////////////////////////////////////////////////////////
  updateTaskCommand = (e) => {
    this.setState({
      taskCommand: e.target.value,
    });
  };


  ////////////////////////////////////////////////////////////
  updateTaskName = (e) => {
    this.setState({
      taskName: e.target.value,
      taskNameError: ''
    });
  };


  ////////////////////////////////////////////////////////////
  updateTaskDate = (e, date) => {
    this.setState({
      taskDate: date
    });
  };


  ////////////////////////////////////////////////////////////
  updateTaskCronString = (e) => {
    this.setState({
      taskCronString: e.target.value
    });
  };


  ////////////////////////////////////////////////////////////
  updateTaskType = (tab) => {
    this.setState({
      taskType: tab.props['data-route']
    });
  };


  // TODO: Add in collapse button
  render() {
    return (
      <Wrapper>
        <HeaderBar>
          <HeaderTitle >
            SCHEDULED TASKS
          </HeaderTitle>
          <AddTasksButton
            onTouchTap={this.openTaskDialog} />
        </HeaderBar>
        <TaskContainer>
          {this.state.tasks.map((task) => {
            return (
              <TaskCard
                taskName={task.taskName}
                deleteTask={this.deleteTask}
                taskCronString={task.taskCronString}
                taskDate={task.taskDate}
                taskType={task.taskType}
                taskTime={parse(task.taskTime)}
                taskCommand={task.taskCommand}
                key={task.taskName}
              />);
          })}
        </TaskContainer>
        <CreateTaskDialog
          open={this.state.open}
          actionSubmit={this.addTask}
          actionCancel={this.closeTaskDialog}
        >
          <TaskCreationForm
            taskTime={this.state.taskTime}
            taskDate={this.state.taskDate}
            taskCronString={this.state.taskCronString}
            taskName={this.state.taskName}
            taskNameError={this.state.taskNameError}
            taskCommand={this.state.taskCommand}
            onTimeChanged={this.updateTaskTime}
            onNameChanged={this.updateTaskName}
            onCommandChanged={this.updateTaskCommand}
            onDateChanged={this.updateTaskDate}
            onTypeChanged={this.updateTaskType}
            onCronStringChanged={this.updateTaskCronString}
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
  flex-shrink: 1;
`;
const TaskContainer = styled.div`
  box-sizing: border-box;
  flex-grow:1;
  display: flex;
  flex-direction:column;
  justify-content:flex-start;
  overflow-y:auto;
  padding: 10px;
  min-width: 400px;
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
const HeaderTitle = styled.div`
  flex-grow: 1;
`;

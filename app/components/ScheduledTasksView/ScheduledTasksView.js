import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import * as taskActions from '../../actions/scheduledTasksActions';
import * as taskUtils from '../../utils/scheduledTasksUtils';

import { black } from '../../styles/colors';
import TaskCard from './TaskCard';
import AddTasksButton from './AddTaskButton';
import CreateTaskDialog from './CreateTaskDialog';


@connect((store) => ({
  tasks: store.tasks,
  server: store.server
}))
class ScheduledTasksView extends Component {

  componentDidMount() {
    this.props.dispatch(taskActions.loadTasks(taskUtils.getTasksFromLocalStorage()));
  }

  showCreateTaskDialog = () => {
    this.props.dispatch(taskActions.openCreateTaskDialog());
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
            onTouchTap={this.showCreateTaskDialog}
          />
        </HeaderBar>
        <TaskContainer>
          {this.props.tasks.tasks.map((task) => {
            return (
              <TaskCard
                {...task}
                dispatch={this.props.dispatch}
                key={task.name}
              />);
          })}
        </TaskContainer>
        <CreateTaskDialog />
      </Wrapper>
    );
  }
}

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

export default ScheduledTasksView;

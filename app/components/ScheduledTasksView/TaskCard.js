import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import format from 'date-fns/format';
import prettyCron from 'prettycron';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import isPast from 'date-fns/is_past';

import * as taskActions from '../../actions/scheduledTasksActions';
import * as taskUtils from '../../utils/scheduledTasksUtils';

import { replaceTimeOfDate } from '../../utils/dateUtils';


class TaskCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.cronJob = {};
  }

  componentDidMount() {
    // TODO: Move this somewhere else. Maybe into the server so I can have multiple cronJobs running at the same time for multiple servers
    if (this.props.type === 'RECURRING') {
      // create the cron object
      this.cronJob = taskUtils.scheduleCronStringTask(this.props, this.props.dispatch);
    }
    if (this.props.type === 'SPECIFIC') {
      // create the cron object
      this.cronJob = taskUtils.scheduleDateTimeTask(this.props, this.props.dispatch);
    }
  }

  componentWillUnmount() {
    try {
      this.cronJob.cancel();
    } catch (e) {
      this.props.dispatch(taskActions.removeTaskByName(this.props.name));
    }
  }

  removeTask = () => {
    this.props.dispatch(taskActions.removeTaskByName(this.props.name));
    try {
      this.cronJob.cancel();
    } catch (e) {
      console.log(e);
    }

  };

  render() {
    return (
      <TaskCardContainer zDepth={1} >
        <Name>
          {this.props.name}
        </Name>

        {this.props.type === 'RECURRING' ?
          <TaskCronString>
            {this.props.cronString} <br />
            Runs {prettyCron.toString(this.props.cronString)}
          </TaskCronString>
          :
          <div>
            <TaskTime>
              {isPast(replaceTimeOfDate(this.props.time, this.props.date))
                ? distanceInWordsToNow(replaceTimeOfDate(this.props.time, this.props.date))
                : 'Past Task Date/Time'}
            </TaskTime>
            <TaskDate>
              Runs {format(this.props.date, 'MM/DD/YY')} @ {format(this.props.time, 'HH:mm')}
            </TaskDate>
          </div>
        }

        <TaskCommand>
          {this.props.command}
        </TaskCommand>
        <TaskCommand>
          Times run : {this.props.runs}
        </TaskCommand>

        <Spacer />

        <TaskActions>
          <IconButton onTouchTap={this.removeTask} >
            <DeleteIcon />
          </IconButton>
        </TaskActions>

      </TaskCardContainer>
    );
  }
}

const TaskCardContainer = styled(Paper)`
  width: 350px;
  min-height: 200px;
  margin-top:15px;
  display: flex;
  flex-direction:column;
  padding: 5px;
  content-sizing:border-box;
`;
const Name = styled.div`
  padding-bottom:5px;
`;
const TaskTime = styled.div`
  padding-bottom:5px;
`;
const TaskDate = styled.div`
  padding-bottom:5px;
`;
const TaskCronString = styled.div`
  padding-bottom:5px;
`;
const TaskCommand = styled.div`
  padding-bottom:5px;
`;
const Spacer = styled.div`
  flex-grow: 1;
`;
const TaskActions = styled.div`
  display: flex;
  justify-content:flex-end;
  align-items: center;
`;


export default TaskCard;

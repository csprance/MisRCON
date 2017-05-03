// The logic for the task scheduling is kept here because it's created and destroyed along with the component itself
// It's probably not the best place for it so I'm open to suggestions on where to put it.

import React, { Component, PropTypes }from 'react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import format from 'date-fns/format';
import prettyCron from 'prettycron';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import isPast from 'date-fns/is_past';

import { replaceTimeOfDate } from '../../utils/dateUtils';
import { scheduleTaskAtTime, scheduleTaskAtDateTime } from '../../utils/scheduleTask';
import { log } from '../../utils/loggerUtils';

class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cronJob: {} // the CronJob object associated with this TaskCard can do things like .cancel() on this
    };
  }

  /**
   * Creates a CronJob that runs when the component is mounted
   * Decides whether to schedule at a date or recurring
   */
  componentDidMount() {
    if (this.props.taskType === 'RECURRING') {
      this.setState({
        cronJob: scheduleTaskAtTime(this.props.taskCommand, this.props.taskCronString),
      });
    }
    if (this.props.taskType === 'SPECIFIC') {
      this.setState({
        cronJob: scheduleTaskAtDateTime(this.props.taskCommand, this.props.taskDate, this.props.taskTime),
      });
    }
  }

  /**
   * Destroys the CronJob
   */
  componentWillUnmount() {
    if (this.state.cronJob !== null) {
      log('silly', `removing task: ${this.props.taskName}`);
      this.state.cronJob.cancel();
    }
  }


  render() {
    return (
      <TaskCardContainer zDepth={1} >
        <Name>
          {this.props.taskName}
        </Name>

        {this.props.taskType === 'RECURRING' ? (
            <div>
              <TaskCronString>
                {this.props.taskCronString} <br />
                Runs {prettyCron.toString(this.props.taskCronString)}
              </TaskCronString>
            </div>
          ) : (
            <div>
              <TaskTime>
                {isPast(replaceTimeOfDate(this.props.taskTime, this.props.taskDate)) === false ? (
                    <div>
                      Next {distanceInWordsToNow(replaceTimeOfDate(this.props.taskTime, this.props.taskDate))}
                    </div>
                  ) : (
                    <div>
                      Past Task Date/Time
                    </div>
                  )}
              </TaskTime>
              <TaskDate>
                Runs {format(this.props.taskDate, 'MM/DD/YY')} @ {format(this.props.taskTime, 'HH:mm')}
              </TaskDate>
            </div>
          )}

        <TaskCommand>
          {this.props.taskCommand}
        </TaskCommand>
        <Spacer />
        <TaskActions>
          <IconButton
            onTouchTap={this.props.deleteTask.bind(null, this.props.taskName, this.props.taskTime, this.props.taskCommand)} >
            <DeleteIcon />
          </IconButton>
        </TaskActions>
      </TaskCardContainer>
    );
  }
}

TaskCard.propTypes = {
  deleteTask: React.PropTypes.func.isRequired,
  taskName: React.PropTypes.string.isRequired,
  taskCronString: React.PropTypes.string,
  taskTime: React.PropTypes.object,
  taskType: React.PropTypes.string,
  taskDate: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]),
  taskCommand: React.PropTypes.string.isRequired,
};

export default TaskCard;

//////////////////
// styles
//////////////////
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



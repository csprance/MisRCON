/**
 * Name: scheduledTasksReducer
 * Created by chris on 3/17/2017.
 * Description:
 */

import * as types from '../constants/ActionTypes';
import * as taskUtils from '../utils/scheduleTask';

taskUtils.bootstrap();

const taskStructure = {
  taskType: 'SPECIFIC', // the type of task RECURRING or SPECIFIC
  taskDate: new Date(), // a string representation of the date
  taskTime: new Date(), // the Date() of the task for the time
  taskCronString: '',   // the cron string
  taskName: '',         // the name of the task
  taskCommand: '',      // the command sent to the server
  numRuns: 0,           // the number of times the task has been run
};

const initialState = {
  open: false,                            // is the CreateTaskDialog dialog open
  tasks: taskUtils.getTasksFromLocalStorage(), // the array containing all the tasks object data
};

export default function credentials(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TASK: {
      return {...state, tasks: [].concat(state, action.payload)};
    }
    case types.REMOVE_TASK: {
      return {...state, tasks: state.filter(task => task.name !== action.payload)};
    }
    default:
      return state;
  }
}

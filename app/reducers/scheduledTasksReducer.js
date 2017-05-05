/**
 * Name: scheduledTasksReducer
 * Created by chris on 3/17/2017.
 * Description:
 */
import * as types from '../constants/ActionTypes';
import * as taskUtils from '../utils/scheduledTasksUtils';

taskUtils.bootstrap();

const initialState = {
  open: false,           // is the CreateTaskDialog dialog open
  display: 'none',           // is the CreateTaskDialog dialog open
  tasks: [],             // the array containing all the tasks object data
};

export default function scheduleTasks(state = initialState, action) {
  switch (action.type) {
    case types.TASKS_LOADED: {
      return {
        ...state,
        tasks: [].concat(state.tasks, action.payload)
      };
    }
    case types.ADD_TASK: {
      return {
        ...state,
        tasks: [].concat(state.tasks, action.payload)
      };
    }
    case types.REMOVE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.name !== action.payload)
      };
    }
    case types.INCREMENT_TASK: {
      return {
        ...state,
        tasks: state.tasks.map(i => (i.name === action.payload ? {...i, runs: i.runs + 1} : i))
      };
    }
    case types.SHOW_TASK_DIALOG: {
      return {
        ...state,
        open: action.payload
      };
    }
    case types.TOGGLE_TASK_LIST: {
      return {
        ...state,
        display: state.display === 'flex' ? 'none' : 'flex'
      };
    }
    default:
      return state;
  }
}

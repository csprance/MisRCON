// This file is only a placeholder it is not used for now
import {GET_TASKS, SET_TASKS} from '../actions/tasks';

export default function tasks(state=0, action) {
  switch (action.type) {
    case GET_TASKS:
      return state + 1;
    case SET_TASKS:
      return state - 1;
    default:
      return state;
  }
}

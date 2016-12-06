// @flow
import {GET_TASKS, SET_TASKS} from '../actions/tasks';

export default function tasks(state: number = 0, action: Object) {
  switch (action.type) {
    case GET_TASKS:
      return state + 1;
    case SET_TASKS:
      return state - 1;
    default:
      return state;
  }
}

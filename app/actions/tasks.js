export const GET_TASKS = 'GET_TASKS';
export const SET_TASKS = 'SET_TASKS';

export function getTasks() {
  return {
    type: GET_TASKS
  };
}

export function setTasks() {
  return {
    type: SET_TASKS
  };
}


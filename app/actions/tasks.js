// TODO: Jump To Redux if Needed!
// This file is only a placeholder it is not used for now

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


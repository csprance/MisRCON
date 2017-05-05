/**
 * Name: scheduledTasksActions
 * Created by chris on 5/3/2017.
 * Description:
 */
import * as actionType from '../constants/ActionTypes';
import * as taskUtils from '../utils/scheduledTasksUtils';


// // // // // // // // //
// Thunks
// // // // // // // // //
export const loadTasks = (taskList) => {
  return dispatch => {
    // schedule specific tasks
    taskList.forEach(task => {
      dispatch(addTaskToState(task));
    });
  };
};
// // // // // // // // //
// Action Creators
// // // // // // // // //
export function addTaskToState(task) {
  // store it
  taskUtils.addTaskToLocalStorage(task);
  return {
    type: actionType.ADD_TASK,
    payload: task
  };
}
export function removeTaskByName(name) {
  // remove it from local storage
  taskUtils.removeTaskFromLocalStorageByName(name);
  return {
    type: actionType.REMOVE_TASK,
    payload: name
  };
}
export function incrementTaskByName(name) {
  taskUtils.incrementTaskInLocalStorageByName(name);
  return {
    type: actionType.INCREMENT_TASK,
    payload: name
  };
}
export function tasksLoaded(tasks) {
  return {
    type: actionType.TASKS_LOADED,
    payload: tasks
  };
}
export function closeCreateTaskDialog() {
  return {
    type: actionType.SHOW_TASK_DIALOG,
    payload: false
  };
}
export function openCreateTaskDialog() {
  return {
    type: actionType.SHOW_TASK_DIALOG,
    payload: true
  };
}
export function toggleTaskList() {
  return {
    type: actionType.TOGGLE_TASK_LIST,
  };
}

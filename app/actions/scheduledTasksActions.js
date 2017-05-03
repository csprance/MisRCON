/**
 * Name: scheduledTasksActions
 * Created by chris on 5/3/2017.
 * Description:
 */

import * as actionType from '../constants/ActionTypes';
import * as taskUtils from '../utils/scheduledTasksUtils';

export const scheduleTaskAtTime = (task) => {

  taskUtils.addTaskToLocalStorage(task);

  return (dispatch, getState) => {
    taskUtils.scheduleTaskAtTime({
      ...getState().credentials.active,
      command: task.taskCommand,
      cronString: task.taskCronString
    });
  };
};

export const scheduleTaskAtDateTime = (task) => {

  taskUtils.addTaskToLocalStorage(task);

  return (dispatch, getState) => {
    taskUtils.scheduleTaskAtDateTime({
      ...getState().credentials.active,
      command: task.taskCommand,
      timeOfTask: task.timeOfTask,
      dateOfTask: task.dateOfTask,
      cronString: task.taskCronString
    });
  };
};


export function removeTaskByName(name) {

  taskUtils.removeTaskFromLocalStorageByName(name);

  return {
    type: actionType.REMOVE_TASK,
    payload: name
  };
}

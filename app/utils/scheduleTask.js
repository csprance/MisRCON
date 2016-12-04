export function scheduleTaskatTime(taskToRun, dateOfTask) {

  let now = new Date();
  let taskDate = dateOfTask - now;
  if (taskDate < 0) {
    taskDate += 86400000; // it's after 10am, try 10am tomorrow.
  }
  setTimeout(function () {
    taskToRun()
  }, taskDate);
}

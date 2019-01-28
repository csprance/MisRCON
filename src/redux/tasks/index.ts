import * as tasksActions from './actions';
import tasksReducer, { TasksActions } from './reducer';
import { ITask, TasksState } from './types';

export default tasksReducer;
export { tasksActions, TasksState, TasksActions, ITask };

import Task from '../../db/entities/Task';
import * as tasksActions from './actions';
import tasksReducer, { TasksActions } from './reducer';
import { TasksState } from './types';

export default tasksReducer;
export { tasksActions, TasksState, TasksActions, Task };

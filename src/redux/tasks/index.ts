import * as tasksActions from './actions';
import tasksReducer, { TasksActions } from './reducer';
import { OnTickFunctionFactory, Task, TasksState } from './types';

export default tasksReducer;
export { tasksActions, TasksState, TasksActions, Task, OnTickFunctionFactory };

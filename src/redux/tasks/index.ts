import * as tasksActions from './actions';
import tasksReducer from './reducer';
import { OnTickFunctionFactory, Task, TasksActions, TasksState } from './types';

export default tasksReducer;
export { tasksActions, TasksState, TasksActions, Task, OnTickFunctionFactory };

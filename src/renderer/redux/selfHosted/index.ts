import * as selfHostedActions from './actions';
import selfHostedReducer, { SelfHostedActions } from './reducer';
import { SelfHostedState } from './types';

export default selfHostedReducer;
export { selfHostedActions, SelfHostedState, SelfHostedActions };

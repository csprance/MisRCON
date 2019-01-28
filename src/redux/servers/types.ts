import { ActionType } from 'typesafe-actions';

import Server from '../../db/entities/Server';
import * as serversActions from './actions';


export type ServersActions = ActionType<typeof serversActions>;
export type ServersState = Server[];

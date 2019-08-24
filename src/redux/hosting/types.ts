import { ActionType } from 'typesafe-actions';

import { actions } from './index';

export interface Hosting {
  id: number;
  completed: boolean;
  hostingText: string;
}

export type State = Hosting[];

export type HostingActions = ActionType<typeof actions>;

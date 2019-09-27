import { ActionType } from 'typesafe-actions';

import { actions } from './index';

export interface Hosting {
  // Server ID
  id: number;
  // The hosting text of the server
  hostingText: string;
  // The location of the hosting.cfg file
  hostingPath: string;
  // If what's in state is different from what's in the hosting.cfg
  diff: boolean;
}

export type State = Hosting[];

export type HostingActions = ActionType<typeof actions>;

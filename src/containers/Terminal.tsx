import * as React from 'react';
import { connect } from 'react-redux';

import RCONTerminal from '../components/RCONTerminal';
import { Dispatch, RootState } from '../redux/redux-types';
import { Server } from '../redux/servers';
import { activeServerSelector } from '../redux/servers/selectors';
import { tasksSelector } from '../redux/tasks/selectors';
import { activeTerminalSelector } from '../redux/terminal/selectors';
import { Terminal } from '../redux/terminal/types';

const Terminal: React.FunctionComponent<{
  dispatch: Dispatch;
  activeServer: Server;
  activeTerminal: Terminal;
  rconHistory: () => string[];
  tasks: any;
}> = props => {
  return <RCONTerminal {...props} />;
};

const mapStateToProps = (state: RootState) => ({
  activeServer: activeServerSelector(state),
  tasks: tasksSelector(state),
  rconHistory: () => state.rcon.requests.map(req => req.command), // TODO Select active server history
  activeTerminal: activeTerminalSelector(state)[0]
});
export default connect(mapStateToProps)(Terminal);

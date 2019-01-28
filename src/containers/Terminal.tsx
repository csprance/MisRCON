import * as React from 'react';
import { connect } from 'react-redux';

import RCONTerminal from '../components/RCONTerminal';
import Server from '../db/entities/Server';
import { Dispatch, RootState } from '../redux/redux-types';
import { activeServerSelector } from '../redux/servers/selectors';
import { tasksSelector } from '../redux/tasks/selectors';

const Terminal: React.FunctionComponent<{
  dispatch: Dispatch;
  activeServer: Server;
}> = props => <RCONTerminal {...props} />;

const mapStateToProps = (state: RootState) => ({
  activeServer: activeServerSelector(state),
  tasks: tasksSelector(state)
});
export default connect(mapStateToProps)(Terminal);

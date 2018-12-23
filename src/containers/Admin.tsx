import * as React from 'react';
import { connect } from 'react-redux';

import RCONTerminal from '../components/RCONTerminal';
import { Dispatch, RootState } from '../redux/redux-types';
import { IServer } from '../redux/servers';
import { getActiveServer } from '../redux/servers/selectors';

const Admin: React.FunctionComponent<{
  dispatch: Dispatch;
  activeServer: IServer;
}> = props => <RCONTerminal {...props} />;

const mapStateToProps = (state: RootState) => ({
  activeServer: getActiveServer(state),
  tasks: state.tasks
});
export default connect(mapStateToProps)(Admin);

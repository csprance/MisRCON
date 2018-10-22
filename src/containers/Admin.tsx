import * as React from 'react';
import { connect } from 'react-redux';

import { Dispatch, RootState } from '../redux/redux-types';
import { IServer } from '../redux/servers';

import RCONTerminal from '../components/RCONTerminal';
import { getActiveServer } from '../redux/servers/selectors';

interface Props {
  dispatch: Dispatch;
  activeServer: IServer;
}
const Admin: React.SFC<Props> = props => {
  return <RCONTerminal {...props} />;
};

export const mapStateToProps = (state: RootState) => ({
  activeServer: getActiveServer(state),
  tasks: state.tasks
});

export default connect(mapStateToProps)(Admin);

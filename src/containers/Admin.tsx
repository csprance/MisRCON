import * as React from 'react';
import { connect } from 'react-redux';

import { Dispatch, RootState } from '../redux/redux-types';
import { IServer } from '../redux/servers';

import RCONTerminal from '../components/RCONTerminal';
import { getActiveServer } from '../redux/servers/selectors';

type Props = {
  dispatch: Dispatch;
  activeServer: IServer;
};
type State = {};
class Admin extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {};

  public render() {
    const { activeServer } = this.props;
    return (
      <RCONTerminal
        activeServer={activeServer}
        dispatch={this.props.dispatch}
      />
    );
  }
}

export const mapStateToProps = (state: RootState) => ({
  activeServer: getActiveServer(state),
  tasks: state.tasks
});

export default connect(mapStateToProps)(Admin);

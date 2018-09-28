import * as React from 'react';
import { connect } from 'react-redux';

import RCONTerminal from '../components/RCONTerminal';
import { IRootState } from '../redux';

type Props = {};
type State = {};

class Admin extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {};

  public render() {
    return <RCONTerminal />;
  }
}

export default connect(
  (state: IRootState) => ({
    servers: state.servers
  }),
  dispatch => ({ actionCreatorName: () => dispatch({ type: 'ACTION_TYPE' }) })
)(Admin);

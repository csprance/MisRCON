import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IRootState } from '../redux';
import * as rconActions from '../redux/rcon/rcon-actions';
import { ServersState } from '../redux/servers/servers-types';

import RCONTerminal from '../components/RCONTerminal';

type Props = {
  sendRCON: () => Promise<void>;
  servers: ServersState;
};
type State = {};
class Admin extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {};

  public render() {
    return (
      <RCONTerminal
      />
    );
  }
}

export const mapStateToProps = (state: IRootState) => ({
  servers: state.servers
});
export const mapDispatchToProps = (dispatch: Dispatch<IRootState>) =>
  bindActionCreators(
    {
      sendRCON: rconActions.sendRCONFlow
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Admin);

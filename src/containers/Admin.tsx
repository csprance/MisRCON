import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IRootState } from '../redux';
import * as rconActions from '../redux/rcon/rcon-actions';
import { IServer } from '../redux/servers/servers-types';

import RCONTerminal from '../components/RCONTerminal';
import { IRCONRequest } from '../redux/rcon/rcon-types';
import { getActiveServer } from '../redux/servers/servers-selectors';

type Props = {
  sendRCON: () => Promise<IRCONRequest>;
  activeServer: IServer;
};
type State = {};
class Admin extends React.Component<Props, State> {
  public static defaultProps = {};
  public state = {};

  componentWillMount() {
    console.log(this.props)
  }


  public render() {
    const { sendRCON, activeServer } = this.props;
    return <RCONTerminal activeServer={activeServer} sendRCON={sendRCON} />;
  }
}

export const mapStateToProps = (state: IRootState) => ({
  activeServer: getActiveServer(state)
});
export const mapDispatchToProps = (dispatch: Dispatch<IRootState>) =>
  bindActionCreators(
    {
      sendRCON: rconActions.sendRCONFlow
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Admin);

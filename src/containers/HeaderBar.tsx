import { StatusResponse } from 'node-misrcon';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import TogglePlayerListButton from '../components/TogglePlayerListButton';
import ToggleSettingsButton from '../components/ToggleSettingsButton';
import { togglePlayerList, toggleSettingsDialog } from '../redux/app/actions';
import { latestRCONStatusByServerIpPortSelector } from '../redux/rcon/selectors';
import { Dispatch, RootState } from '../redux/redux-types';
import { activeServerSelector } from '../redux/servers/selectors';
import { bg0, bg1, bg3, text } from '../styles/colors';

const Wrapper = styled.div`
  display: flex;
  background: ${bg3};
  flex-grow: 1;
  width: 100%;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  border-bottom: solid 1px ${bg0};
  padding-left: 15px;
  align-items: center;
  padding-right: 10px;
`;
const HeaderBarText = styled.div`
  color: ${text.primary};
  font-size: 0.9em;
  flex-grow: 1;
`;
const Divider = styled.div`
  font-size: 2em;
  color: ${bg1};
  margin-left: 10px;
`;
const PlayerCount = styled(HeaderBarText)`
  display: flex;
  margin-left: 10px;
  color: ${text.secondary};
`;
const Spacer = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;
interface Props {}
interface ReduxProps {
  status: StatusResponse | null;
  togglePlayerList: () => void;
  toggleSettingsDialog: () => void;
}
const HeaderBar: React.FunctionComponent<Props & ReduxProps> = props => {
  const name = props.status ? props.status.name : '...';
  const version = props.status ? props.status.version : '...';
  const map = props.status ? props.status.level : '...';
  const weather = props.status ? props.status.weather : '...';
  return (
    <Wrapper>
      <HeaderBarText>{name}</HeaderBarText>
      <Divider> | </Divider>
      <PlayerCount>{version}</PlayerCount>
      <Divider> | </Divider>
      <PlayerCount>{map}</PlayerCount>
      <Divider> | </Divider>
      <PlayerCount>{weather}</PlayerCount>
      <Spacer />
      <TogglePlayerListButton onClick={props.togglePlayerList} />
      <ToggleSettingsButton onClick={props.toggleSettingsDialog} />
    </Wrapper>
  );
};

export const mapStateToProps = (state: RootState) => ({
  status: latestRCONStatusByServerIpPortSelector(
    state,
    activeServerSelector(state)
  )
});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  togglePlayerList: () => dispatch(togglePlayerList()),
  toggleSettingsDialog: () => dispatch(toggleSettingsDialog())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBar);

import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import TogglePlayerListButton from '../components/TogglePlayerListButton';
import ToggleSettingsButton from '../components/ToggleSettingsButton';
import { AppState } from '../redux/app';
import { togglePlayerList, toggleSettingsDialog } from '../redux/app/actions';
import { appStateSelector } from '../redux/app/selectors';
import { Dispatch, RootState } from '../redux/redux-types';
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
type Props = {
  app: AppState;
  togglePlayerList: () => void;
  toggleSettingsDialog: () => void;
};
type State = {};
class HeaderBar extends React.Component<Props, State> {
  public static defaultProps = {};
  public state: State = {};

  public render() {
    return (
      <Wrapper>
        <HeaderBarText>@Official Miscreated - US 75 #2008</HeaderBarText>
        <Divider> | </Divider>
        <PlayerCount>101145</PlayerCount>
        <Divider> | </Divider>
        <PlayerCount>Islands</PlayerCount>
        <Spacer />
        <TogglePlayerListButton onClick={this.props.togglePlayerList} />
        <ToggleSettingsButton onClick={this.props.toggleSettingsDialog} />
      </Wrapper>
    );
  }
}

export const mapStateToProps = (state: RootState) => ({
  app: appStateSelector(state)
});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  togglePlayerList: () => dispatch(togglePlayerList()),
  toggleSettingsDialog: () => dispatch(toggleSettingsDialog())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBar);

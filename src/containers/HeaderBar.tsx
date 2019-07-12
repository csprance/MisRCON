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
import { bg0, bg3, text } from '../styles/colors';
import { media } from '../styles/styles';
import UpdateAppButton from '../components/UpdateAppButton';
import { updateNeededSelector } from '../redux/app/selectors';

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
  justify-content: flex-start;
`;

const ServerName = styled.div`
  min-width: 0;
  margin-right: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${text.primary};
  font-size: 0.9em;
  ${media.small`
    max-width: 250px;
  `};
`;

const HeaderText = styled.div`
  min-width: 0;
  flex-basis: 10%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 0.9em;
  color: ${text.secondary};
`;

const Controls = styled.div`
  display: flex;
  height: 100%;
  align-self: flex-end;
  flex: 1;
  justify-content: flex-end;
`;

interface Props {}
interface ReduxProps {
  status: StatusResponse | null;
  togglePlayerList: () => void;
  toggleSettingsDialog: () => void;
  updateNeeded: boolean;
}
const HeaderBar: React.FunctionComponent<Props & ReduxProps> = props => {
  const handleUpdateButtonClicked = () => {
    console.log('Updating Application');
  };
  const name = props.status ? props.status.name : '';
  const version = props.status ? props.status.version : '';
  const map = props.status ? props.status.level : '';
  const weather = props.status ? props.status.weather : '';
  const time = props.status ? props.status.time : '';
  return (
    <Wrapper>
      <ServerName>{name}</ServerName>

      <HeaderText>{version}</HeaderText>

      <HeaderText>{map}</HeaderText>

      <HeaderText>{weather}</HeaderText>

      <HeaderText>{time}</HeaderText>

      <Controls>
        {props.updateNeeded ? (
          <UpdateAppButton onClick={handleUpdateButtonClicked} />
        ) : (
          ''
        )}
        <TogglePlayerListButton onClick={props.togglePlayerList} />
        <ToggleSettingsButton onClick={props.toggleSettingsDialog} />
      </Controls>
    </Wrapper>
  );
};

export const mapStateToProps = (state: RootState) => ({
  status: latestRCONStatusByServerIpPortSelector(
    state,
    activeServerSelector(state)
  ),
  updateNeeded: updateNeededSelector(state)
});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  togglePlayerList: () => dispatch(togglePlayerList()),
  toggleSettingsDialog: () => dispatch(toggleSettingsDialog())
});
export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);

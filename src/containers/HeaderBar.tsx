import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import TogglePlayerListButton from '../components/TogglePlayerListButton';
import ToggleSettingsButton from '../components/ToggleSettingsButton';
import UpdateAppButton from '../components/UpdateAppButton';
import { openExternally } from '../lib/utils';
import { togglePlayerList, toggleSettingsDialog } from '../redux/app/actions';
import { updateNeededSelector } from '../redux/app/selectors';
import { latestRCONStatusByServerIpPortSelector } from '../redux/rcon/selectors';
import { RootState } from '../redux/redux-types';
import { activeServerSelector } from '../redux/servers/selectors';
import { bg0, bg3, text } from '../styles/colors';
import { media } from '../styles/styles';

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
const HeaderBar: React.FunctionComponent<Props> = ({}) => {
  // Redux State
  const dispatch = useDispatch();
  const updateNeeded = useSelector(updateNeededSelector);
  const status = useSelector((state: RootState) =>
    latestRCONStatusByServerIpPortSelector(state, activeServerSelector(state))
  );
  const name = status ? status.name : '';
  const version = status ? status.version : '';
  const map = status ? status.level : '';
  const weather = status ? status.weather : '';
  const time = status ? status.time : '';

  // Handles
  const handleTogglePlayerList = () => dispatch(togglePlayerList());
  const handleToggleSettingsDialog = () => dispatch(toggleSettingsDialog());
  const handleUpdateButtonClicked = () => {
    openExternally('https://github.com/csprance/misrcon/releases/latest');
  };

  return (
    <Wrapper>
      <ServerName>{name}</ServerName>
      <HeaderText>{version}</HeaderText>
      <HeaderText>{map}</HeaderText>
      <HeaderText>{weather}</HeaderText>
      <HeaderText>{time}</HeaderText>
      <Controls>
        {updateNeeded ? (
          <UpdateAppButton onClick={handleUpdateButtonClicked} />
        ) : (
          ''
        )}
        <TogglePlayerListButton onClick={handleTogglePlayerList} />
        <ToggleSettingsButton onClick={handleToggleSettingsDialog} />
      </Controls>
    </Wrapper>
  );
};

export default HeaderBar;

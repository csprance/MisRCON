import { ICellRendererParams } from 'ag-grid-community';
import * as React from 'react';
import styled from 'styled-components';

import {
  banSteamIDThunk,
  removeBanSteamIDThunk
} from '../../redux/players/actions';
import { isBannedOnActiveServerBySteamIDSelector } from '../../redux/players/selectors';
import { getGetStateFunc } from '../../redux/selectors';
import ButtonWithConfirmation from '../ButtonWithConfirmation';
import { withMaterialTheme } from './withMaterialTheme';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const BanControlsRenderer: React.FunctionComponent<ICellRendererParams> = ({
  data
}) => {
  const { steam } = data;
  const dispatch = (window as any).store.dispatch;
  const getState = getGetStateFunc(dispatch);
  const isBanned = isBannedOnActiveServerBySteamIDSelector(getState(), {
    steam
  });
  const handleClick = () => {
    if (isBanned) {
      dispatch(removeBanSteamIDThunk(steam));
    } else {
      dispatch(banSteamIDThunk(steam));
    }
  };

  return (
    <Wrapper>
      <ButtonWithConfirmation
        title={isBanned ? `Remove Ban From: ${steam}` : `Add Ban To: ${steam}`}
        description={
          isBanned
            ? `Are you sure you want to remove the player with Steam ID: ${steam} from the ban list?`
            : `Are you sure you want to add the player with Steam ID: ${steam} to the ban list?`
        }
        onConfirm={handleClick}
      >
        {isBanned ? 'UnBan' : 'Ban'}
      </ButtonWithConfirmation>
    </Wrapper>
  );
};

export default withMaterialTheme(BanControlsRenderer);

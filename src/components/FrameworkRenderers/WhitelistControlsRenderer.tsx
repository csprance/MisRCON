import { ICellRendererParams } from 'ag-grid-community';
import * as React from 'react';
import styled from 'styled-components';

import {
  removeWhitelistSteamIDThunk,
  whitelistSteamIDThunk
} from '../../redux/players/actions';
import { isWhitelistedOnActiveServerBySteamIDSelector } from '../../redux/players/selectors';
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

const WhitelistControlsRenderer: React.FunctionComponent<
  ICellRendererParams
> = ({ data }) => {
  const { steam } = data;
  const dispatch = (window as any).store.dispatch;
  const getState = getGetStateFunc(dispatch);
  const isWhitelisted = isWhitelistedOnActiveServerBySteamIDSelector(
    getState(),
    {
      steam
    }
  );
  const handleClick = () => {
    if (isWhitelisted) {
      dispatch(removeWhitelistSteamIDThunk(steam));
    } else {
      dispatch(whitelistSteamIDThunk(steam));
    }
  };

  return (
    <Wrapper>
      <ButtonWithConfirmation
        title={
          isWhitelisted
            ? `Remove From Whitelist: ${steam}`
            : `Add To Whitelist: ${steam}`
        }
        description={
          isWhitelisted
            ? `Are you sure you want to remove the player with Steam ID: ${steam} from the whitelist?`
            : `Are you sure you want to add the player with Steam ID: ${steam} to the whitelist?`
        }
        onConfirm={handleClick}
      >
        {isWhitelisted ? 'UnWhitelist' : 'Whitelist'}
      </ButtonWithConfirmation>
    </Wrapper>
  );
};

export default withMaterialTheme(WhitelistControlsRenderer);

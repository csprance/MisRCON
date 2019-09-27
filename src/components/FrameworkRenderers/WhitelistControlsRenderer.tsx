import Button from '@material-ui/core/Button';
import { ICellRendererParams } from 'ag-grid-community';
import * as React from 'react';
import styled from 'styled-components';

import {
  removeWhitelistSteamIDThunk,
  whitelistSteamIDThunk
} from '../../redux/players/actions';
import { isWhitelistedOnActiveServerBySteamIDSelector } from '../../redux/players/selectors';
import { getGetStateFunc } from '../../redux/selectors';

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
      <Button onClick={handleClick}>
        {' '}
        {isWhitelisted ? 'UnWhitelist' : 'Whitelist'}
      </Button>
    </Wrapper>
  );
};
export default WhitelistControlsRenderer;

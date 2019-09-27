import Button from '@material-ui/core/Button';
import { ICellRendererParams } from 'ag-grid-community';
import * as React from 'react';
import styled from 'styled-components';

import {
  banSteamIDThunk,
  removeBanSteamIDThunk
} from '../../redux/players/actions';
import { isBannedOnActiveServerBySteamIDSelector } from '../../redux/players/selectors';
import { getGetStateFunc } from '../../redux/selectors';

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
      <Button onClick={handleClick}>{isBanned ? 'UnBan' : 'Ban'}</Button>
    </Wrapper>
  );
};
export default BanControlsRenderer;

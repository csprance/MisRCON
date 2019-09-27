import Button from '@material-ui/core/Button';
import { ICellRendererParams } from 'ag-grid-community';
import * as React from 'react';
import styled from 'styled-components';

import { kickSteamIDThunk } from '../../redux/players/actions';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const KickControlsRenderer: React.FunctionComponent<ICellRendererParams> = ({
  data
}) => {
  const { steam, active } = data;
  const dispatch = (window as any).store.dispatch;
  const handleClick = () => {
    dispatch(kickSteamIDThunk(steam));
  };
  return (
    <Wrapper>
      <Button onClick={handleClick} disabled={!active}>
        Kick
      </Button>
    </Wrapper>
  );
};
export default KickControlsRenderer;

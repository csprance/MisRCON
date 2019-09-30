import { ICellRendererParams } from 'ag-grid-community';
import * as React from 'react';
import styled from 'styled-components';

import { kickSteamIDThunk } from '../../redux/players/actions';
import ButtonWithConfirmation from '../ButtonWithConfirmation';
import { withMaterialTheme } from './withMaterialTheme';

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
  const handleConfirm = () => {
    dispatch(kickSteamIDThunk(steam));
  };

  return (
    <Wrapper>
      <ButtonWithConfirmation
        title={`Kick Player: ${steam}`}
        description={`Are you sure you want to kick the player with Steam ID: ${steam}?`}
        onConfirm={handleConfirm}
        disabled={!active}
      >
        Kick
      </ButtonWithConfirmation>
    </Wrapper>
  );
};

export default withMaterialTheme(KickControlsRenderer);

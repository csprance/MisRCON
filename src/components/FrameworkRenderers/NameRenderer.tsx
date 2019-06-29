import { ICellRendererParams } from 'ag-grid-community';
import * as React from 'react';
import styled from 'styled-components';
import PlayerName from '../PlayerName';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const NameRenderer = ({ value, data }: ICellRendererParams) => (
  <Wrapper>
    <PlayerName active={data.active} color={data.color}>
      {value}
    </PlayerName>
  </Wrapper>
);
export default NameRenderer;

import { ICellRendererParams } from 'ag-grid-community';
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const FlagRenderer = ({ value }: ICellRendererParams) => {
  return (
    <Wrapper>
      <span
        className={`flag-icon flag-icon-${value ? value.toLowerCase() : 'US'} flag-icon-squared`}
      />
    </Wrapper>
  );
};

export default FlagRenderer;

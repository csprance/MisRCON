import UnCheckedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import CheckedIcon from '@material-ui/icons/CheckBoxRounded';
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

const BooleanRenderer = ({ value }: ICellRendererParams) => (
  <Wrapper>{value ? <CheckedIcon /> : <UnCheckedIcon />}</Wrapper>
);
export default BooleanRenderer;

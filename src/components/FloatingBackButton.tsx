import IconButton from '@material-ui/core/IconButton/IconButton';
import BackArrowIcon from '@material-ui/icons/ArrowBackRounded';
import * as React from 'react';
import styled from 'styled-components';
import Link from './Link';

const FloatingBackButon = styled(IconButton)`
  position: absolute !important;
  top: 10px;
  left: 10px;
`;

export type Props = {
  to: string;
};
export default ({ to }: Props) => (
  <Link to={to}>
    <FloatingBackButon>
      <BackArrowIcon />
    </FloatingBackButon>
  </Link>
);

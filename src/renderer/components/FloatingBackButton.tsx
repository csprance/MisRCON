import IconButton from '@material-ui/core/IconButton';
import BackArrowIcon from '@material-ui/icons/ArrowBackRounded';
import * as React from 'react';
import styled from 'styled-components';
import Link from './Link';

const FloatingBackButon = styled(IconButton as any)`
  position: absolute !important;
  top: 35px;
  left: 10px;
`;

export default ({ to }: { to: string }) => (
  <Link to={to}>
    <FloatingBackButon>
      <BackArrowIcon />
    </FloatingBackButon>
  </Link>
);

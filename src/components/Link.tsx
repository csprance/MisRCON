import { History } from 'history';
import LocationDescriptor = History.LocationDescriptor;
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from '../styles/theme';

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: ${theme.palette.text.primary};
  &:hover {
    color: ${theme.palette.text.secondary};
  }
`;

interface Props {
  to: LocationDescriptor<any>;
}
const Link: React.FunctionComponent<Props> = ({ to, children }) => (
  <StyledLink to={to}>{children}</StyledLink>
);

export default Link;

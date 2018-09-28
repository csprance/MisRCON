import { History } from 'history';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from '../styles/theme';
import LocationDescriptor = History.LocationDescriptor;

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: ${theme.palette.text.primary};
  &:hover {
    color: ${theme.palette.text.secondary};
  }
`;
type Props = {
  to: LocationDescriptor<any>;
};
type State = {};
class Link extends React.Component<Props, State> {
  public render() {
    return <StyledLink to={this.props.to}>{this.props.children}</StyledLink>;
  }
}

export default Link;

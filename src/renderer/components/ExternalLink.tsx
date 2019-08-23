import * as React from 'react';
import styled from 'styled-components';

import { openExternally } from '../lib/utils';

const StyledLink = styled.a`
  cursor: pointer;
`;
type Props = {
  href: string;
};
const ExternalLink: React.FunctionComponent<Props> = ({ href, children }) => (
  <StyledLink onClick={() => openExternally(href)}>{children}</StyledLink>
);

export default ExternalLink;

import * as React from 'react';
import styled from 'styled-components';
import { text } from '../styles/colors';

const Wrapper = styled.div`
  display: flex;
  font-weight: 700;
  color: ${text.secondary};
  text-transform: uppercase;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

interface Props {}
const SubHeader: React.FunctionComponent<Props> = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);

export default SubHeader;

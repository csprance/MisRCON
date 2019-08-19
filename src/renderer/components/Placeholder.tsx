import * as React from 'react';
import styled from 'styled-components';
import { bg3 } from '../styles/colors';

const Wrapper = styled.div`
  display: flex;
  background: ${bg3};
  width: 100%;
  height: 100%;
`;

type Props = {};
const Placeholder: React.FunctionComponent<Props> = () => {
  return <Wrapper>Placeholder</Wrapper>;
};

export default Placeholder;

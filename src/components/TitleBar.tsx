import * as React from 'react';
import styled from 'styled-components';

import { lighterMidGray } from '../styles/colors';
import TitleBarButton from './TitleBarButton';
import TitleBarMenu from './TitleBarMenu';

export const Wrapper = styled.div`
  margin-top: 5px;
  display: flex;
  height: 30px;
  -webkit-app-region: drag;
  align-items: center;
  justify-content: center;
  border-bottom: ${lighterMidGray} solid 1px;
`;
export const LeftSpacer = styled.div`
  width: 5px;
  height: 100%;
  -webkit-app-region: no-drag;
`;
export const Spacer = styled.div`
  flex-grow: 3;
`;
export const Title = styled.div`
  position: relative;
  color: white;
  font-size: 14px;
  top: -3px;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', serif;
  padding-left: 5px;
`;

const TitleBar = () => {
  return (
    <Wrapper>
      <LeftSpacer />
      <TitleBarMenu />
      <Title>MisRCON</Title>
      <Spacer />
      <TitleBarButton type={'minimize'} />
      <TitleBarButton type={'maximize'} />
      <TitleBarButton type={'close'} />
    </Wrapper>
  );
};

export default TitleBar;

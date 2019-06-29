import * as React from 'react';
import styled from 'styled-components';

import { bg0, lighterMidGray, text } from '../styles/colors';
import TitleBarButton from './TitleBarButton';

export const Wrapper = styled.div`
  margin-top: 5px;
  display: flex;
  height: 22px;
  min-height: 22px;
  max-height: 22px;
  -webkit-app-region: drag;
  align-items: center;
  justify-content: center;
  background:${bg0};
  //border-bottom: ${lighterMidGray} solid 1px;
  z-index: 1500;
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
  color: ${text.secondary};
  font-size: 13px;
  top: -3px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  //font-family: 'Segoe UI', serif;
  padding-left: 5px;
`;

const TitleBar: React.FunctionComponent<{}> = () => {
  return (
    <Wrapper>
      <LeftSpacer />
      <Title>MisRCON</Title>
      <Spacer />
      <TitleBarButton type={'minimize'} />
      <TitleBarButton type={'maximize'} />
      <TitleBarButton type={'close'} />
    </Wrapper>
  );
};

export default TitleBar;

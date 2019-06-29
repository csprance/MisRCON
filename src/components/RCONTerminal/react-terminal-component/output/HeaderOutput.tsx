import * as React from 'react';
import styled from 'styled-components';

import PromptSymbol from '../PromptSymbol';
import OutputContainer from './OutputContainer';
import TextCommandWrapper from './TextCommandWrapper';

const DateTime = styled.div`
  opacity: 0.2;
`;
const Spacer = styled.div`
  flex-grow: 1;
`;

type Props = {
  content: any;
  date: number;
  promptSymbol: string;
};
const HeaderOutput = ({ content, date, promptSymbol }: Props) => {
  const d = new Date(date);
  return (
    <OutputContainer>
      <PromptSymbol>{promptSymbol}</PromptSymbol>
      <TextCommandWrapper>{content.command}</TextCommandWrapper>
      <Spacer />
      <DateTime>
        {[d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') +
          ' ' +
          [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')}
      </DateTime>
    </OutputContainer>
  );
};

export default HeaderOutput;

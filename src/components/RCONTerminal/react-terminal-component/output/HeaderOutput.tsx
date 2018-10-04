import * as React from 'react';

import PromptSymbol from '../PromptSymbol';
import OutputContainer from './OutputContainer';
import TextCommandWrapper from './TextCommandWrapper';

type Props = {
  content: any;
  promptSymbol: any;
};
const HeaderOutput = ({ content, promptSymbol }: Props) => (
  <OutputContainer>
    <PromptSymbol>{promptSymbol}</PromptSymbol>
    <TextCommandWrapper>{content.command}</TextCommandWrapper>
  </OutputContainer>
);

export default HeaderOutput;

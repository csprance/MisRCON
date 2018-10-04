import * as React from 'react';
import OutputContainer from './OutputContainer';
import TextErrorWrapper from './TextErrorWrapper';

type Props = {
  content: string;
};
const TextErrorOutput = ({ content }: Props) => (
  <TextErrorWrapper>
    <OutputContainer>{content}</OutputContainer>
  </TextErrorWrapper>
);

export default TextErrorOutput;

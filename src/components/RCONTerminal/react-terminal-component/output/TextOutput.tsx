import * as React from 'react';
import OutputContainer from './OutputContainer';

type Props = { content: string };
const TextOutput = ({ content }: Props) => (
  <OutputContainer>{content}</OutputContainer>
);

export default TextOutput;

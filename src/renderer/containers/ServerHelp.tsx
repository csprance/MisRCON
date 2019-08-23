import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { serverHelpMarkdownSelector } from '../redux/app/selectors';
import { bg3, text } from '../styles/colors';
import { MarkDownStyle } from '../styles/markdown-styles';

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  color: ${text.primary};
  background: ${bg3};
  flex-direction: column;
  overflow-y: scroll;
  & pre {
    max-width: 400px;
  }
  width: 100%;
`;
interface Props {}

const ServerHelp: React.FunctionComponent<Props> = ({}) => {
  const markdown = useSelector(serverHelpMarkdownSelector);

  return (
    <Wrapper>
      <MarkDownStyle />
      <ReactMarkdown className={'markdown-body'} source={markdown} />
    </Wrapper>
  );
};

export default ServerHelp;

import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bg3, text } from '../styles/colors';
import { MarkDownStyle } from '../styles/markdown-styles';

import { serverHelpMarkdownSelector } from '../redux/app/selectors';
import { RootState } from '../redux/redux-types';

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
interface ReduxProps {
  markdown: string;
}
const ServerHelp: React.FunctionComponent<Props & ReduxProps> = ({
  markdown
}) => {
  return (
    <Wrapper>
      <MarkDownStyle />
      <ReactMarkdown className={'markdown-body'} source={markdown} />
    </Wrapper>
  );
};

export default connect((state: RootState) => ({
  markdown: serverHelpMarkdownSelector(state)
}))(ServerHelp);

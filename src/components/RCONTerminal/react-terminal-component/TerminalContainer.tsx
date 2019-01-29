import styled from 'styled-components';
import defaultTheme from './themes/default';

const TerminalContainer = styled.div`
  & > :last-child {
    padding-bottom: ${({ theme }) => theme.spacing};
  }
  height: 100%;
  flex-grow: 1;
  line-height: 1.2em;
  padding: ${({ theme }) => theme.spacing};
  overflow-y: scroll;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  color: ${({ theme }) => theme.outputColor};
  background: ${({ theme }) => theme.background};
  font-family: monospace;
  font-size: ${({ theme }) => theme.fontSize};
  border-top: #1f2124 solid 1px;
`;

TerminalContainer.defaultProps = {
  theme: defaultTheme
};

export default TerminalContainer;

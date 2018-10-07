import { injectGlobal } from 'styled-components';
import { theme } from './theme';

export const injectGlobalStyles = () => {
  // noinspection TsLint
  injectGlobal`
  * {
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSize};
    font-weight: ${theme.typography.fontWeightLight};
  }
  *::-webkit-scrollbar {
    width: 5px;
  }
  *::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }
  *::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
  #App {
  flex-grow: 1;
  }
  body, html {
    display: flex;
    flex-grow: 1; 
    height: 100%;
  }
  `;
};

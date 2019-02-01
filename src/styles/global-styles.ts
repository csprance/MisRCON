import { createGlobalStyle } from 'styled-components';
import { bg0, darkDarkBlack } from './colors';
// import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  *::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
  *::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    height: 10px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    height: 10px;
    outline: 1px solid slategrey;
  }
  #App {
    font-family: Raleway, sans-serif !important;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    background: ${bg0};
  }
  body, html {
    background-color: ${darkDarkBlack};
    display: flex;
    flex-grow: 1;
    height: 100%;
    width: 100%;
  }
`;

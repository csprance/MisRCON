import { createGlobalStyle } from 'styled-components';
import { darkDarkBlack } from './colors';
// import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
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
  width: 100%;
  height: 100%;
  }
  body, html {
    background-color: ${darkDarkBlack};
    display: flex;
    flex-grow: 1; 
    height: 100%;
  }
  `;

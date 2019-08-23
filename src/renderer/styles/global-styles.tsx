import { createGlobalStyle } from 'styled-components';
import { bg0, darkDarkBlack } from './colors';

export const GlobalStyles = createGlobalStyle`
#app {
  font-family: Raleway, sans-serif !important;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  background: ${bg0};
}
body, html {
  font-family: Raleway, sans-serif !important;
  background-color: ${darkDarkBlack};
  display: flex;
  flex-grow: 1;
  height: 100%;
  width: 100%;
}
`;

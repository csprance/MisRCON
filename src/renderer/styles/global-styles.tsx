import { createGlobalStyle } from 'styled-components';
import { bg0, darkDarkBlack } from './colors';
// import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
#App {
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

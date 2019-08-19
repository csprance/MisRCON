import defaultTheme, { ConsoleTheme } from './default';

export const magpieTheme: ConsoleTheme = {
  ...defaultTheme,
  background: 'black',
  commandColor: 'white',
  outputColor: 'white',
  errorOutputColor: '#ff8383',
  promptSymbolColor: 'white',
};

export default magpieTheme;

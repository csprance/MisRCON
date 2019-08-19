import defaultTheme, { ConsoleTheme } from './default';

export const forestTheme: ConsoleTheme = {
  ...defaultTheme,
  background: '#2d4422',
  commandColor: '#ffcc60',
  outputColor: '#ffcc60',
  errorOutputColor: '#e5e67f',
  promptSymbolColor: '#ffad00',
};

export default forestTheme;

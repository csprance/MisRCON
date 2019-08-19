import defaultTheme, {ConsoleTheme} from './default';

export const lightTheme: ConsoleTheme =  {
  ...defaultTheme,
  background: 'white',
  commandColor: 'black',
  outputColor: 'black',
  errorOutputColor: '#e856ee',
  promptSymbolColor: '#9156ff'
};
export default lightTheme;

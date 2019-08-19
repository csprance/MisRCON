import { bg3 } from '../../../../styles/colors';

export interface ConsoleTheme {
  background: string;
  promptSymbolColor: string;
  commandColor: string;
  outputColor: string;
  errorOutputColor: string;
  fontSize: string;
  spacing: string;
  fontFamily: string;
}

const defaultColors = {
  background: bg3,
  promptSymbolColor: '#6effe6',
  commandColor: '#fcfcfc',
  outputColor: '#fcfcfc',
  errorOutputColor: '#ff89bd',
};

export const defaultTheme: ConsoleTheme = {
  ...defaultColors,
  fontSize: '1.1rem',
  spacing: '1%',
  fontFamily: 'monospace',
};

export default defaultTheme;

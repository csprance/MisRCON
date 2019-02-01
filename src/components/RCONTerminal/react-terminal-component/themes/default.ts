import { bg3 } from '../../../../styles/colors';

const defaultColors = {
  background: bg3,
  promptSymbolColor: '#6effe6',
  commandColor: '#fcfcfc',
  outputColor: '#fcfcfc',
  errorOutputColor: '#ff89bd'
};

export default {
  ...defaultColors,
  fontSize: '1.1rem',
  spacing: '1%',
  fontFamily: 'monospace'
};

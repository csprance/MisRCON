import defaultTheme, { ConsoleTheme } from "./default";

export const dyeTheme: ConsoleTheme = {
  ...defaultTheme,
  background: '#282a38',
  commandColor: '#acffe7',
  outputColor: '#fff',
  errorOutputColor: '#ff8e8e',
  promptSymbolColor: '#f8aeff'
};

export default dyeTheme
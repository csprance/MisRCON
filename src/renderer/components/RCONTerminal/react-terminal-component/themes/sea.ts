import defaultTheme, { ConsoleTheme } from "./default";

export const seaTheme: ConsoleTheme = {
  ...defaultTheme,
  background: '#0e2933',
  commandColor: '#6efeff',
  outputColor: '#cefffa',
  errorOutputColor: '#b6a6ff',
  promptSymbolColor: '#6efeff'
};

export default seaTheme;
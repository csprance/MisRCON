import defaultTheme, { ConsoleTheme } from './default';
import dye from './dye';
import ember from './ember';
import forest from './forest';
import hacker from './hacker';
import light from './light';
import magpie from './magpie';
import sea from './sea';

export const themes: { [key: string]: ConsoleTheme } = {
  magpie,
  light,
  ember,
  dye,
  forest,
  hacker,
  sea,
  default: defaultTheme,
};

export default themes;

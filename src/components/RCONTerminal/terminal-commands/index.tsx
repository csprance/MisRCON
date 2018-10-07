import {
  CommandMapping,
  defaultCommandMapping,
} from 'async-javascript-terminal';

import chuck from './chuck';
import help from './help';
import rconCommands from './rcon-commands';

export default CommandMapping.create({
  ...rconCommands,
  clear: defaultCommandMapping.clear,
  history: defaultCommandMapping.history,
  echo: defaultCommandMapping.echo,
  chuck,
  help
});

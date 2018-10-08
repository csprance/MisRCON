import {
  CommandMapping,
  defaultCommandMapping
} from 'async-javascript-terminal';

import chuck from './chuck';
import help from './help';
import makeRconCommands from './rcon-commands';
import makeTaskCommand from './task';

import { Dispatch } from '../../../redux/redux-types';

export default (dispatch: Dispatch) =>
  CommandMapping.create({
    task: makeTaskCommand(dispatch),
    ...makeRconCommands(dispatch),
    clear: defaultCommandMapping.clear,
    history: defaultCommandMapping.history,
    echo: defaultCommandMapping.echo,
    printenv: defaultCommandMapping.printenv,
    chuck,
    help
  });

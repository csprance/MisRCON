import {
  CommandMapping,
  defaultCommandMapping
} from 'async-javascript-terminal';

import chuck from './chuck';
import help from './help';
import notify from './notify';
import quit from './quit';
import makeRconCommands from './rcon-commands';
import makeServerCommand from './server';
import makeTaskCommand from './task';

import { Dispatch, RootState } from '../../../redux/redux-types';


export default (dispatch: Dispatch, getState: () => RootState) =>
  CommandMapping.create({
    notify: notify(dispatch, getState),
    task: makeTaskCommand(dispatch, getState),
    server: makeServerCommand(dispatch, getState),
    ...makeRconCommands(dispatch, getState),
    clear: defaultCommandMapping.clear,
    history: defaultCommandMapping.history,
    echo: defaultCommandMapping.echo,
    printenv: defaultCommandMapping.printenv,
    chuck,
    help,
    quit
  });

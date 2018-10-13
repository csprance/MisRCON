import { EmulatorState, OutputFactory } from 'async-javascript-terminal';
import getOpts = require('get-options');
import * as React from 'react';
import { Dispatch } from '../../../redux/redux-types';
import { ITask, tasksActions } from '../../../redux/tasks';
import { createRunningRCONTask } from '../../../redux/tasks/utils';
import TerminalTaskList from '../react-terminal-component/output/TerminalTaskList';

const optDef = {
  '-a, --add': '',
  '-c, --cron': '<cron...>',
  '-d, --date': '<date...>',
  '-e, --enabled': '',
  '-i, --id': '<id>',
  '-n, --name': '<name...>',
  '-r, --rm': '',
  '-l, --ls': '',
  '-s, --send': '<command...>',
  '-t, --toggle': ''
};
const help = 'Add a task to the state from the terminal';
/// task add --name test --cron * * 8 * 4 * --send sv_say "Hello!" --id 1
export default (dispatch: Dispatch) => ({
  function: async (_: EmulatorState, opts: string[]) => {
    try {
      const { options } = getOpts(opts, optDef);
      const cronString = options.cron ? options.cron.join(' ') : '';
      const command = options.send ? options.send.join(' ') : '';
      const name = options.name ? options.name.join(' ') : 'Task From CLI';
      const id = options.id ? parseInt(options.id, 10) : -1;

      // Add an rcon task
      if (options.add) {
        // Initialize the task obj
        const task: ITask = createRunningRCONTask(
          {
            cronString,
            command,
            id,
            name
          },
          dispatch
        );
        // store the task in state
        dispatch(tasksActions.addTaskThunk(task));
        return output(`Added task ${task.name}`);
      }

      // Remove a task
      if (options.rm) {
        if (options.id) {
          dispatch(tasksActions.removeTaskThunk({ id }));
          return output(`Removed task by id ${id}`);
        }
        if (options.name) {
          dispatch(tasksActions.removeTaskThunk({ name }));
          return output(`Removed task by name: ${name}`);
        }
        if (options.cron) {
          dispatch(tasksActions.removeTaskThunk({ cronString }));
          return output(`Removed task by cron string ${cronString}`);
        }
      }
      // List all tasks
      if (options.ls) {
        const results = dispatch(tasksActions.getTasksThunk());

        return output(<TerminalTaskList tasks={results} />);
      }

      // Toggle a task on or off
      if (options.toggle) {
        if (options.id && (await dispatch(tasksActions.toggleTaskThunk(id)))) {
          return output(`Toggled task with id ${id}`);
        }
        return output('No task with that id');
      }

      return output("That doesn't seem to be a task command");
    } catch (e) {
      return {
        output: OutputFactory.makeErrorOutput(e)
      };
    }
  },
  optDef,
  help
});

const output = (content: any) => ({
  output: OutputFactory.makeTextOutput(content)
});

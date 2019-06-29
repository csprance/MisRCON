import { EmulatorState, OutputFactory } from 'async-javascript-terminal';
import * as getOpts from 'get-options';
import * as React from 'react';

import { Dispatch, GetStateFunc } from '../../../redux/redux-types';
import { tasksActions } from '../../../redux/tasks';
import {
  makeTaskByIDSelector,
  makeTaskByPartialSelector,
  tasksSelector
} from '../../../redux/tasks/selectors';
import { defaultRecurringTask } from '../../../redux/tasks/state';
import TerminalTaskList from '../react-terminal-component/output/TerminalTaskList';

const optDef = {
  '-a, --add': '',
  '-c, --cron': '<cron...>',
  '-d, --date': '<date...>',
  '-e, --enabled': '',
  '-i, --id': '<id>',
  '-l, --ls': '',
  '-n, --name': '<name...>',
  '-r, --rm': '',
  '-s, --send': '<command...>',
  '-t, --toggle': ''
};
const help = `Add a task to the state from the terminal
Options: 
---
${Object.keys(optDef).map(opt  => opt).join('\n')}
---
Add Task:
  task --add --id 1 --name Task Name --enabled --cron * * * * * * --send RCON Command
Remove Task By (ID, Name, CronString):
  task --rm --id 1 --name Task Name --cron * * * * *
Toggle Task By (ID):
  task --toggle --id 1
`;
/// task add --name test --cron * * 8 * 4 * --send sv_say "Hello!" --id 1
export default (dispatch: Dispatch, getState: GetStateFunc) => ({
  function: async (_: EmulatorState, opts: string[]) => {
    try {
      const { options } = getOpts(opts, optDef);
      const cronString = options.cron ? options.cron.join(' ') : '';
      const command = options.send ? options.send.join(' ') : '';
      const name = options.name ? options.name.join(' ') : 'Task From CLI';
      const id = options.id ? Number(options.id) : -1;

      // Add an rcon task
      if (options.add) {
        // Initialize the task obj
        const task = {
          ...defaultRecurringTask,
          command,
          cronString,
          id,
          name
        };
        // store the task in state
        dispatch(tasksActions.addTaskThunk(task));
        return output(`Added task ${task.name}`);
      }

      // Remove a task
      if (options.rm) {
        // Remove by ID
        if (options.id) {
          dispatch(tasksActions.removeTaskThunk(id));
          return output(`Removed task by id ${id}`);
        }
        // Remove by Name
        if (options.name) {
          const task = makeTaskByPartialSelector({ name })(getState());
          if (task) {
            dispatch(tasksActions.removeTaskThunk(task.id));
            return output(`Removed task by name: ${name}`);
          }
          return output(`No task by name: ${name}`);
        }
        // Remove by Cron String
        if (options.cron) {
          const task = makeTaskByPartialSelector({ cronString })(getState());
          if (task) {
            dispatch(tasksActions.removeTaskThunk(task.id));
            return output(`Removed task by cron string ${cronString}`);
          }
          return output(`No task by CronString: ${cronString}`);
        }
      }

      // List all tasks
      if (options.ls) {
        return output(<TerminalTaskList tasks={tasksSelector(getState())} />);
      }

      // Toggle a task on or off
      if (options.toggle) {
        const task = makeTaskByIDSelector()(getState(), {id: options.id});
        if (task) {
          await dispatch(tasksActions.toggleTaskThunk(id));
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

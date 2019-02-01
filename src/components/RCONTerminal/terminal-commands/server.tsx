import { EmulatorState, OutputFactory } from 'async-javascript-terminal';
import * as getOpts from 'get-options';
import * as React from 'react';

import Server from '../../../db/entities/Server';
import logger from '../../../lib/logger';
import { Dispatch, GetStateFunc } from '../../../redux/redux-types';
import { serversActions } from '../../../redux/servers';
import TerminalServerList from '../react-terminal-component/output/TerminalServerList';

const optDef = {
  '-a, --add': '',
  '-d, --id': '<id>',
  '-i, --ip': '<ip>',
  '-p, --port': '<port>',
  '-a, --active': '<active>',
  '-n, --name': '<name...>',
  '-h, --hash': '<hash>',
  '-r, --rm': '',
  '-l, --ls': '',
  '-s, --switch': ''
};
const help = 'Add a task to the state from the terminal';
/// server --add --name test --id 567 --ip 192.168.1.1 --port 64099 --hash testhash
export default (dispatch: Dispatch, getState: GetStateFunc) => ({
  function: async (_: EmulatorState, opts: string[]) => {
    try {
      const { options } = getOpts(opts, optDef);
      const ip = options.ip ? options.ip : 'localhost';
      const port = options.port ? parseInt(options.port, 10) : -1;
      const name = options.name ? options.name.join(' ') : 'No Name';
      const id = options.id ? Number(options.id) : Date.now();
      const password = options.password ? options.password : '';

      // Add a task
      if (options.add) {
        const server: Server = {
          id,
          ip,
          port,
          password,
          name,
          avatar: 'https://placehold.it/64x64',
          active: false,
          selfHosted: false,
          rootPath: ''
        };
        dispatch(serversActions.addServerToDbThunk(server));
        return output(`Added server ${server.name}`);
      }

      // Remove a task
      if (options.rm) {
        if (options.id) {
          dispatch(serversActions.removeServerFromDbThunk({ id }));
          return output(`Removed task by id ${id}`);
        }
        if (options.name) {
          dispatch(serversActions.removeServerFromDbThunk({ name }));
          return output(`Removed task by name: ${name}`);
        }
      }

      // List all tasks
      if (options.ls) {
        const { servers } = getState();
        return output(<TerminalServerList servers={servers} />);
      }

      // Switch to a different server
      if (options.switch) {
        // Switch by ID
        if (options.id) {
          const { servers } = getState();
          const server = servers.find(s => s.id === id);
          if (server) {
            dispatch(serversActions.markServerActiveThunk(id));
            return output(`Switched to server ${server.name}`);
          }
          return output(`Server Not Found!`);
        }

        // Switch by Name
        if (options.name) {
          const { servers } = getState();
          const server = servers.find(s => s.name === name);
          if (server) {
            dispatch(serversActions.markServerActiveThunk(server.id));
            return output(`Switched to server ${server.name}`);
          }
          return output(`Server not found`);
        }
      }

      return output("That doesn't seem to be a server command");
    } catch (e) {
      logger.error(e);
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

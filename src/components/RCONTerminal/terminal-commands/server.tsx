import { EmulatorState, OutputFactory } from 'async-javascript-terminal';
import * as getOpts from 'get-options';
import * as React from 'react';
import { Dispatch } from '../../../redux/redux-types';
import { IServer, serversActions } from '../../../redux/servers';
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
export default (dispatch: Dispatch) => ({
  function: async (_: EmulatorState, opts: string[]) => {
    try {
      const { options } = getOpts(opts, optDef);
      const ip = options.ip ? options.ip : 'localhost';
      const port = options.port ? parseInt(options.port, 10) : -1;
      const name = options.name ? options.name.join(' ') : 'No Name';
      const id = options.id ? options.id : Date.now().toString();
      const hash = options.password ? options.password : '';

      // Add a task
      if (options.add) {
        const server: IServer = {
          id,
          ip,
          port,
          hash,
          name,
          active: false
        };
        dispatch(serversActions.addToDbThunk(server));
        return output(`Added server ${server.name}`);
      }

      // Remove a task
      if (options.rm) {
        if (options.id) {
          dispatch(serversActions.removeFromDbThunk({ id }));
          return output(`Removed task by id ${id}`);
        }
        if (options.name) {
          dispatch(serversActions.removeFromDbThunk({ name }));
          return output(`Removed task by name: ${name}`);
        }
      }

      // List all tasks
      if (options.ls) {
        const servers = dispatch(serversActions.getServersThunk());
        return output(<TerminalServerList servers={servers} />);
      }

      // Switch to a different server
      if (options.switch) {
        // Switch by ID
        if (options.id) {
          const serversList = await dispatch(serversActions.getServersThunk());
          const server = serversList.find(s => s.id === id);
          if (server) {
            dispatch(serversActions.markActiveThunk(id));
            return output(`Switched to server ${server.name}`);
          }
          return output(`Server Not Found!`);
        }

        // Switch by Name
        if (options.name) {
          const serversList = await dispatch(serversActions.getServersThunk());
          const server = serversList.find(s => s.name === name);
          if (server) {
            dispatch(serversActions.markActiveThunk(server.id));
            return output(`Switched to server ${server.name}`);
          }
          return output(`Server not found`);
        }
      }

      return output("That doesn't seem to be a server command");
    } catch (e) {
      console.log(e);

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

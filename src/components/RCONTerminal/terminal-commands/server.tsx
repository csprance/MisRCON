import { EmulatorState, OutputFactory } from 'async-javascript-terminal';
import * as getOpts from 'get-options';
import * as React from 'react';

import logger from '../../../lib/logger';
import { Dispatch, GetStateFunc } from '../../../redux/redux-types';
import { Server, serversActions } from '../../../redux/servers';
import TerminalServerList from '../react-terminal-component/output/TerminalServerList';
import { runSetupScript } from '../../../lib/run-spafbi-server-setup/run-spafbi-server-setup';
import { activeServerSelector } from '../../../redux/servers/selectors';
import { bg2, orange } from '../../../styles/colors';

const optDef = {
  '-a, --add': '',
  '-d, --id': '<id>',
  '-i, --ip': '<ip>',
  '-is, --init': '', // Initialize Server
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
      const { options, argv } = getOpts(opts, optDef);
      const ip = options.ip ? options.ip : 'localhost';
      const port = options.port ? parseInt(options.port, 10) : -1;
      const name = options.name ? options.name.join(' ') : 'No Name';
      const id = options.id ? Number(options.id) : Date.now();
      const password = options.password ? options.password : '';

      if (options.init) {
        const activeServer = activeServerSelector(getState());
        const rootPath = argv[0] ? argv[0] : activeServer.rootPath;

        await runSetupScript(rootPath);
        return output(
          <div>
            <p>
              Server Root will be located at:{' '}
              <span style={{ background: bg2, padding: 10 }}>{rootPath}</span>
            </p>
            <p>
              Starting the script in a new window. Please follow instructions.
              When Miscreated server is running{' '}
              <a
                style={{ color: orange }}
                onClick={() => console.log('Refreshing Server')}
                href=""
              >
                refresh
              </a>{' '}
              your server.
            </p>
          </div>
        );
      }

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
        await dispatch(serversActions.addServerThunk(server));
        return output(`Added server ${server.name}`);
      }

      // Remove a task
      if (options.rm) {
        if (options.id) {
          await dispatch(serversActions.removeServerThunk(id));
          return output(`Removed task by id ${id}`);
        }
        if (options.name) {
          await dispatch(serversActions.removeServerThunk(id));
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
            dispatch(serversActions.markServerActive(id));
            return output(`Switched to server ${server.name}`);
          }
          return output(`Server Not Found!`);
        }

        // Switch by Name
        if (options.name) {
          const { servers } = getState();
          const server = servers.find(s => s.name === name);
          if (server) {
            dispatch(serversActions.markServerActive(server.id));
            return output(`Switched to server ${server.name}`);
          }
          return output(`Server not found`);
        }
      }

      return output("That doesn't seem to be a server command");
    } catch (e) {
      logger.error(e);
      return {
        output: OutputFactory.makeTextOutput(String(e))
      };
    }
  },
  optDef,
  help
});

const output = (content: any) => ({
  output: OutputFactory.makeTextOutput(content)
});

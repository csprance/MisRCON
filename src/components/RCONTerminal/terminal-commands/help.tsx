import { Emulator, OutputFactory } from 'async-javascript-terminal';
import * as React from 'react';

export default {
  function: async (state: any, opts: any) => {
    try {
      const emulator = new Emulator();
      // Return a single help command
      if (opts.length > 0) {
        const help = emulator.getHelp(state, opts[0]);
        return {
          output: OutputFactory.makeTextOutput(
            <div>
              <h4 style={{ color: 'red' }}># {opts[0]}</h4>
              <pre>{help}</pre>
            </div>
          )
        };
      }
      // return all help topics
      const commandNames = (Array.from(
        state.getCommandMapping().keySeq()
      ) as string[])
        .filter(commandName => commandName !== 'default') // Filter out the default command
        .map(commandName => <div key={commandName}>{commandName}</div>);
      return {
        output: OutputFactory.makeTextOutput(<pre>{commandNames}</pre>)
      };
    } catch (e) {
      return {
        output: OutputFactory.makeTextOutput(e)
      };
    }
  },
  optDef: {},
  help: `Type help and a command name for more information about that topic

Example:

🎮 help chuck
Get a funny chuck norris joke right in the terminal.

`
};

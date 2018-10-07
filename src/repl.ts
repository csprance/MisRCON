import { OutputFactory } from 'async-javascript-terminal';
import { NodeMisrcon } from 'node-misrcon';

const rconFunc = async (_: any, opts: string[]) => {
  const rcon = new NodeMisrcon({
    ip: '',
    port: '',
    password: ''
  });
  const results = await rcon.send(opts.join(' '));
  return {
    output: OutputFactory.makeTextOutput(results)
  };
};

const makeCommand = help => ({
  function: rconFunc,
  optDef: {},
  help
});

export default [
  ['sv_say', 'Send a message that shows up on the screen'],
  ['sv_chat', 'Send a message that shows up in the chat box']
].reduce((acc, helpString) => {
  acc[helpString[0]] = makeCommand(helpString[1]);
  return acc;
}, {});

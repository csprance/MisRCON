import { remote } from 'electron';

export default {
  function: async () => {
    const window = remote.getCurrentWindow();
    window.close();
  },
  optDef: {},
  help: 'Quit the application.'
};

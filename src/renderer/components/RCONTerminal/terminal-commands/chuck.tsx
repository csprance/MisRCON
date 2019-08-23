import { OutputFactory } from 'async-javascript-terminal';
import axios from 'axios';

export default {
  function: async () => {
    const { data } = await axios.get('https://api.chucknorris.io/jokes/random');
    return {
      output: OutputFactory.makeTextOutput(data.value)
    };
  },
  optDef: {},
  help: 'Get a funny chuck norris joke right in the terminal.'
};

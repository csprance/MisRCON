import axios from 'axios';

const main = async () => {
  const { data } = await axios.get(
    'https://api.github.com/repos/csprance/MisRCON/releases/latest'
  );
  const remoteVersion = data.tag_name;
};
main();

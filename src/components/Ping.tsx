import Signal0 from '@material-ui/icons/SignalCellular0Bar';
import Signal1 from '@material-ui/icons/SignalCellular1Bar';
import Signal2 from '@material-ui/icons/SignalCellular2Bar';
import Signal3 from '@material-ui/icons/SignalCellular3Bar';
import Signal4 from '@material-ui/icons/SignalCellular4Bar';
import * as React from 'react';

type Props = {
  ping: number;
};
const Ping: React.FunctionComponent<Props> = ({ ping }) => {
  if (ping >= 400) {
    return <Signal0 style={{ color: 'red' }} />;
  }
  if (ping >= 300 && ping < 400) {
    return <Signal1 style={{ color: 'yellow' }} />;
  }
  if (ping >= 200 && ping < 300) {
    return <Signal2 style={{ color: 'yellow' }} />;
  }
  if (ping >= 100 && ping < 200) {
    return <Signal3 style={{ color: 'green' }} />;
  }
  return <Signal4 style={{ color: 'green' }} />;
};

export default Ping;

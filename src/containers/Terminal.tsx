import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RCONTerminal from '../components/RCONTerminal';
import { terminalThemeSelector } from '../redux/app/selectors';
import { rconHistorySelector } from '../redux/rcon/selectors';
import { activeServerSelector } from '../redux/servers/selectors';
import { tasksSelector } from '../redux/tasks/selectors';
import { activeTerminalSelector } from '../redux/terminal/selectors';

const Terminal: React.FunctionComponent<{}> = ({}) => {
  const dispatch = useDispatch();
  const activeServer = useSelector(activeServerSelector);
  const tasks = useSelector(tasksSelector);
  const rconHistory = () => useSelector(rconHistorySelector);
  const activeTerminal = useSelector(activeTerminalSelector)[0];
  const themeName = useSelector(terminalThemeSelector);
  const props = {
    dispatch,
    activeServer,
    tasks,
    rconHistory,
    activeTerminal,
    themeName
  };
  return <RCONTerminal {...props} />;
};

export default Terminal;

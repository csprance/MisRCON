import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RCONTerminal from '../components/RCONTerminal';
import { terminalThemeSelector } from '../redux/app/selectors';
import { activeServerSelector } from '../redux/servers/selectors';
import { tasksSelector } from '../redux/tasks/selectors';
import {
  activeTerminalHistorySelector,
  activeTerminalSelector
} from '../redux/terminal/selectors';

const Terminal: React.FunctionComponent<{}> = ({}) => {
  const dispatch = useDispatch();
  const activeServer = useSelector(activeServerSelector);
  const tasks = useSelector(tasksSelector);
  const history = useSelector(activeTerminalHistorySelector);
  const activeTerminal = useSelector(activeTerminalSelector);
  const themeName = useSelector(terminalThemeSelector);

  const props = {
    dispatch,
    activeServer,
    tasks,
    history,
    activeTerminal,
    themeName
  };
  return <RCONTerminal {...props} />;
};

export default Terminal;

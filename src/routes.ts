import Placeholder from './components/Placeholder';
import BansGrid from './containers/BansGrid';
import Map from './containers/Map';
import PlayersGrid from './containers/PlayersGrid';
import ServerHelp from './containers/ServerHelp';
import TasksGrid from './containers/TasksGrid';
import Terminal from './containers/Terminal';
import WhitelistGrid from './containers/WhitelistGrid';

export default [
  { path: '/', component: WhitelistGrid },
  { path: '/console', component: Terminal },
  { path: '/logs', component: Placeholder },
  { path: '/chat', component: Placeholder },
  { path: '/banlist', component: BansGrid },
  { path: '/players', component: PlayersGrid },
  { path: '/whitelist', component: WhitelistGrid },
  { path: '/hosting', component: Placeholder },
  { path: '/tasks', component: TasksGrid },
  { path: '/help', component: ServerHelp },
  { path: '/map', component: Map }
];

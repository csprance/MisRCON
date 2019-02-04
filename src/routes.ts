import Placeholder from './components/Placeholder';
import BansGrid from './containers/Grids/BansGrid';
import Map from './containers/Map';
import PlayersGrid from './containers/Grids/PlayersGrid';
import ServerHelp from './containers/ServerHelp';
import TasksGrid from './containers/Grids/TasksGrid';
import Terminal from './containers/Terminal';
import WhitelistGrid from './containers/Grids/WhitelistGrid';

export default [
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

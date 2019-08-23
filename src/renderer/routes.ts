import Placeholder from './components/Placeholder';
import BansGrid from './containers/Grids/BansGrid';
import PlayersGrid from './containers/Grids/PlayersGrid';
import TasksGrid from './containers/Grids/TasksGrid';
import WhitelistGrid from './containers/Grids/WhitelistGrid';
import Hosting from './containers/Hosting';
import Map from './containers/Map';
import ServerHelp from './containers/ServerHelp';
import Terminal from './containers/Terminal';

export default [
  { path: '/console', component: Terminal },
  { path: '/logs', component: Placeholder },
  { path: '/chat', component: Placeholder },
  { path: '/banlist', component: BansGrid },
  { path: '/players', component: PlayersGrid },
  { path: '/whitelist', component: WhitelistGrid },
  { path: '/hosting', component: Hosting },
  { path: '/tasks', component: TasksGrid },
  { path: '/help', component: ServerHelp },
  { path: '/map', component: Map }
];

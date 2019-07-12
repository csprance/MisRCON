import {Hosting, State} from './types';

export const defaultHost: Hosting = {
  id: 0,
  completed: false,
  hostingText: `sv_servername=Default Test Server
http_password=password
wm_timeScale=3
wm_timeScaleNight=3
wm_forceTime=-1
g_pinglimit=0
g_pingLimitTimer=15.0
g_idleKickTime=300
g_gameRules_Camera=0
schedule_shutdown_utc=11.0
schedule_shutdown_utc=23.0
g_gameRules_faction0_equip="MilitaryHelmetGreenCamo1;CombatBootsBlack;TacticalVestGreenCamo2;MilitaryJacketTanCamo2;CargoPantsGreenCamo2;SurvivalKnife;DuctTape;Cb_radio;GridMap"
`
};
export const defaultState: State = [];

export default defaultState;

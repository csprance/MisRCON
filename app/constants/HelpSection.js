export const helpText =
  `This console is a direct connection to your server. 
Any commands you enter here will be sent to the 
server via RCON (XMLRPC).

Autocomplete is available by pressing tab

Available Commands:

cls // clears any text from the console

sv_servername "Name of server in quotes" 

wm_timeScale 3 //How Fast time moves

wm_forceTime -1 // Force a current time

g_pinglimit 0 //Ping required to join

g_pingLimitTimer 15 // How long ping bad before kick

g_idleKickTime 300 //How long idle before kick

g_gameRules_Camera 0 // Server enforced camera rules,0=both, 1=fp only, 2=tp only in vehicle

mis_ban_steamid 64BITSTEAMID // Ban Player

mis_ban_status // Get Ban List

mis_ban_remove 64BITSTEAMID // Remove from ban list

mis_kick 64BITSTEAMID  // Kick from server

mis_whitelist_add 64BITSTEAMID // Add to whitelist

mis_whitelist_remove 64BITSTEAMID // remove from whitelist

mis_whitelist_status // Get Whitelist

status // Get server status

sv_say // Send a message

--------------------------

Available weather patterns:

01 | ClearSky
02 | LightRain
03 | HeavyRainThunder
04 | HeavyStorm
05 | TornadoStorm
06 | TornadoRainThunder
07 | LightFog
08 | MediumFog
09 | HeavyFog
10 | TheMist
11 | Rainbow
12 | RainbowHalf
wm_startPattern # or name

Can be used to immediately start a weather pattern by name or number. The number 0 will automatically select one.

wm_pattern x

Can be used for constantly force a weather pattern.

0 | Means no pattern at all
-1 | Means random pattern selection cycle (Default)
x | See weather pattern list (needs to be a number)
wm_disable 1/0

Can be used to disable weather/time manager

0 | Weather manager active (Default)
1 | Weather/Time deactivated
wm_forceTime hours

Can be used to freeze time to a specific hour

-1 | Time not frozen
0 | Midnight
6 | Sunrise
12 | Noon
18 | Sunset
wm_timeOffset hours

Can be used to offset time from system time on server start up

use 24-x for real negative offsets (as positive numbers)

-1 | random offset
0 | no offset
1 | +1 hour offset
wm_timeScale speedscale

Scale time of day speed

0.5 | Half of real time
1 | Real time
4 | 4x as fast as real time
512 | 512x as fast as real time
wm_timeScaleNight speedscale

Scale of night speed (relative to day)

wm_timeScaleWeather speedscale

Scale of weather speed (The weather speed is independent of day/night speed)


`;
export const helpCommands = [{
  display: 'cls Clears the console screen. Client command only',
  value: 'cls'
}, {
  display: 'sv_servername "Name of server in quotes"',
  value: 'sv_servername'
}, {
  display: 'wm_timeScale 3 //How Fast time moves',
  value: 'wm_timeScale'
}, {
  display: 'wm_forceTime -1 // Force a current time',
  value: 'wm_forceTime'
}, {
  display: 'g_pinglimit 0 //Ping required to join',
  value: 'g_pinglimit'
}, {
  display: 'g_pingLimitTimer 15 // How long ping bad before kick',
  value: 'g_pingLimitTimer'
}, {
  display: 'g_idleKickTime 300 //How long idle before kick',
  value: 'g_idleKickTime'
}, {
  display: 'g_gameRules_Camera 0  // Server enforced camera rules,0=both, 1=fp only, 2=tp only in vehicle',
  value: 'g_gameRules_Camera'
}, {
  display: 'mis_ban_steamid 64BITSTEAMID // Ban Player',
  value: 'mis_ban_steamid'
}, {
  display: 'mis_ban_status // Get Ban List',
  value: 'mis_ban_status'
}, {
  display: 'mis_ban_remove 64BITSTEAMID // Remove from ban list',
  value: 'mis_ban_remove'
}, {
  display: 'mis_whitelist_add 64BITSTEAMID // Add to whitelist',
  value: 'mis_whitelist_add'
}, {
  display: 'mis_whitelist_remove 64BITSTEAMID // remove from whitelist',
  value: 'mis_whitelist_remove'
}, {
  display: 'mis_whitelist_status // Get Whitelist',
  value: 'mis_whitelist_status'
}, {
  display: 'status // Get server status',
  value: 'status'
}, {
  display: 'sv_say // Send a message',
  value: 'sv_say'
}, {
  display: 'wm_startPattern WEATHERPATTERN // Sets a weather pattern',
  value: 'wm_startPattern'
}, {
  display: 'wm_disable 0/1 // Disables the weather manager',
  value: 'wm_disable'
}, {
  display: 'wm_forceTime hours // Freezes time at a specific time of day',
  value: 'wm_forceTime'
}, {
  display: 'wm_timeOffset hours // Offset time from system time on server start up use 24-x for real negative offsets',
  value: 'wm_timeOffset'
}, {
  display: 'wm_timeScale speedscale // Scale time of day speed',
  value: 'wm_timeScale'
}, {
  display: 'mis_kick 64BITSTEAMID // Kick players from server',
  value: 'mis_kick'
}];

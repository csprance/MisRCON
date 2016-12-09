export const helpText =
  `This console is a direct connection to your server. 
Any commands you enter here will be sent to the 
server via RCON (XMLRPC).

Available Commands:

cls clear screen

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

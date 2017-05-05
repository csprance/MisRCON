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

PVE/faction system:
-------------------
We added a system that can support of multitude of scenarios like PVE, factions or
role play. Players, Mutants/Animals and Bases have each been assigned a built-in faction
and the damage caused between those factions is controlled in detail by a damage multiplier
matrix.

Players can additionally join factions defined by issuing a chat command "!factionname".
After a faction is joined it can't be left until a server restart. Faction equipment
(if present) is only assigned on respawn. The current faction can be determined with
the chat command "!faction".

Server administrators can fully customize the factions by turning them on/off, the damage,
their names as well as access steamid restrictions and equipment packs.

Up to 4 factions can be defined. We predefined the factions lawmen, outlaw, military
and corporate which can be redefined by the server administrators.

This system allows for example a PVE server of the following kind:
players can't damage each other and bases
players can join a outlaw or lawmen faction
outlaw and lawmen can fight each other while the other players are unaffected
lawmen can't damage each other
players can damage outlaws but not lawmen
outlaws could be allowed to damage bases while lawmen can't
environment can damage anyone (and to increase difficulty player damage to them can be halved while damage to players could be doubled)
lawmen and outlaw respawn with a equipment pack
messages for deaths and join/disconnect
(example below)


Basebuilding adjustment:
------------------------
The server administrator can now fully disallow basebuilding or set it to allow building of bases even in
cities.


New GameRule CVars:
-------------------
g_gameRules_bases=0
No bases allowed on server
g_gameRules_bases=1 (Default)
Normal base building
g_gameRules_faction3-6=1
Activate a faction
Special built-in faction indexes: (built-in factions can't be disabled)
0 - players (without faction)
1 - environment (Mutants, Animals, etc)
2 - bases
g_gameRules_faction_name0-6="factionname"
Sets the factionname and chatcommand keyword to join the faction.
Be sure to select a non conflicting name.
g_gameRules_faction3-6_steamids="123456;1234567;..." (Default: empty, meaning everyone can join)
Access restriction to faction (semicolon seperated list)
g_gameRules_faction0-6_dmg_f0-6=1.0 (Default: All 7x7 cvars are 1.0)
Damage multiplier of faction x to faction y.
0.0 no damage
0.5 means half damage
1.0 normal damage
2.0 double damage


New GameRule CVars (Whitelisted only):
--------------------------------------
g_gameRules_bases=2
Non-zone restricted bases (Bases can be build in cities for events or server specific requirements etc.)
g_gameRules_faction3-6_equip="itemclass;itemclass;..."
Faction equipment packs (semicolon seperated list).

The spelling needs to be exact and case sensitive, should invalid item classes be used it can
cause your server requiring a full reset of your servers database (so stick to item classes
defined in the itemspawnmanager). Double check everything and use copy&pase.

We defined some default ones beforehand, the item classes need to be looked up in the pak files:
Scripts.pak/GameSDK/Scripts/Spawners/ItemSpawnerManager.lua (only use classes not categories)


New Messaging CVars (Whitelisted only):
---------------------------------------
sv_msg_conn=1
Will output playername and faction on connect/disconnect in chat
sv_msg_death=1
Will output killer, victim and weapon/vehicle as well as cause of death/modifiers and factions in chat


------------------------------------------------
– Example .CFG (PVE with outlaw and lawmen) –
------------------------------------------------
– lawmen need to join the faction with !lawmen chat command
– outlaw need to join the faction with !outlaw chat command
– players can't damage each other and bases
g_gameRules_faction0_dmg_f0=0.0
g_gameRules_faction0_dmg_f2=0.0
– players can join a outlaw or lawmen faction
g_gameRules_faction3=1
g_gameRules_faction3_name="lawmen"
g_gameRules_faction4=1
g_gameRules_faction4_name="outlaw"
– outlaw and lawmen can fight each other while the other players are uneffected
g_gameRules_faction3_dmg_f0=0.0
g_gameRules_faction3_dmg_f4=1.0
g_gameRules_faction4_dmg_f0=0.0
g_gameRules_faction4_dmg_f3=1.0
– lawmen can't damage each other
g_gameRules_faction3_dmg_f3=0.0
– players can damage outlaws but not lawmen
g_gameRules_faction0_dmg_f3=0.0
g_gameRules_faction0_dmg_f4=1.0
– outlaws could be allowed to damage bases while lawmen can't
g_gameRules_faction3_dmg_f2=0.0
g_gameRules_faction4_dmg_f2=1.0
– environemt can damage anyone (and to increase difficulty player damage to them can be halfed while damage to players could be doubled)
g_gameRules_faction0_dmg_f1=0.5
g_gameRules_faction3_dmg_f1=0.5
g_gameRules_faction4_dmg_f1=0.5
g_gameRules_faction1_dmg_f0=2.0
g_gameRules_faction1_dmg_f3=2.0
g_gameRules_faction1_dmg_f4=2.0
– lawmen and outlaw respawn with a equipment pack
g_gameRules_faction3_equip="flexcap_policefrontback_blue;SunglassesBBlack;CanvasShoes;TshirtPoliceBlue;CargoPantsBlack;PoliceBaton;PoliceHandcuffs;PoliceHandcuffKey;Cb_radio;Megaphone;Map"
g_gameRules_faction4_equip="HeadbandPatternC;BandanaRed;ScarfOrange;HitopsBlack;NoSleevesVestTan;WandererPantsBlack;BaseballBat;DuctTape;Torch"
– messages for deaths and join/disconnect
sv_msg_conn=1
sv_msg_death=1
– uncomment if wanted: allow bases to be build everywhere
– (if abused you can define a access restricted faction with a high damage multiplier to clean them up)
– g_gameRules_bases=2

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

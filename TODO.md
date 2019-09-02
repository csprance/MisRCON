# TODO List
* Add more info about player:
    * VAC Bans
        * https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/
    * Region
        * geo ip
    * Average Ping
        * probably require a ping reducer that references a player steamid
        * Something like`{id: STEAMID, ping: NUMBER, time: DATE, server: SERVERID}`
* Right Click Server Menu for ServerBar Edit Server does not bring up edit server dialog
* Auto updater For Application (update-electron-app)
* Self Hosted
  * Plot Players on Map from self Hosted server
  * Log Parsing on a Self Hosted Server
  * Hosting Configuration For Self Hosted Servers
    * React-ace for hosting.cfg
  * Chat Log Parsing For Self Hosted Servers

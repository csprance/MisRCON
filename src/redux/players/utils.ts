import axios from 'axios';
import { IPlayer as RCONPlayer } from 'node-misrcon';
import { getConnection } from 'typeorm';

import { steamAPIKey } from '../../constants/secrets';
import Player from '../../db/entities/Player';
import { IPlayer } from './types';

const defaultAvatarUrl = 'http://placehold.it/32x32';
/*
Synchronize gets the data from the database if any or creates a new Player entry and returns it
 */
export const synchronizePlayer = async (
  player: RCONPlayer,
  activeServerId: number
): Promise<IPlayer> => {
  const playerRepo = await getConnection().getRepository(Player);
  const dbPlayer = await playerRepo.findOne({ steam: player.steam });

  // if the Player exists update all the rcon values and return the updated Player
  if (dbPlayer) {
    dbPlayer.steam = player.steam;
    dbPlayer.name = player.name;
    dbPlayer.id = player.id;
    dbPlayer.entID = player.entID;
    dbPlayer.ip = player.ip;
    dbPlayer.ping = player.ping;
    dbPlayer.state = player.state;
    dbPlayer.profile = player.profile;
    dbPlayer.serverID = activeServerId;
    if (dbPlayer.avatarUrl === defaultAvatarUrl) {
      dbPlayer.avatarUrl = await getSteamAvatar(player.steam);
    }
    playerRepo.save(dbPlayer);
    return dbPlayer;
  }
  // Player does not exist so create a new Player and return it
  const newDbPlayer = new Player();
  newDbPlayer.serverID = activeServerId;
  newDbPlayer.avatarUrl = await getSteamAvatar(player.steam);
  newDbPlayer.steam = player.steam;
  newDbPlayer.name = player.name;
  newDbPlayer.id = player.id;
  newDbPlayer.entID = player.entID;
  newDbPlayer.ip = player.ip;
  newDbPlayer.ping = player.ping;
  newDbPlayer.state = player.state;
  newDbPlayer.profile = player.profile;
  return playerRepo.save(newDbPlayer);
};

export const getSteamAvatar = async (steam: number): Promise<string> => {
  const { data } = await axios.get(
    'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/',
    {
      params: {
        key: steamAPIKey,
        steamids: steam
      }
    }
  );
  if (data.response.players[0]) {
    return data.response.players[0].avatar;
  }
  return defaultAvatarUrl;
};

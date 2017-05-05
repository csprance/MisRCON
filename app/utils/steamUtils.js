// TODO: Document getAvatar
/**
 * Name: steamUtils
 * Author: Chrissprance
 * Creation Date: 12/18/2016
 * Description:
 */
import axios from 'axios';
import store from 'store';
import Promise from 'bluebird';

import { log } from './loggerUtils';
import { apiKey } from '../secrets';


export function getAvatar(steam, cancelToken) {
  const player = store.get(steam);
  if (player !== undefined) {
    return new Promise((resolve, reject) => resolve(player.avatar));
  } else {
    return axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/', {
      cancelToken,
      params: {
        key: apiKey,
        steamids: steam
      }
    }).then((res) => {
      log('silly', 'calling Gaben for avatars');
      // store the player data in local storage
      store.set(steam, {...store.get(steam), avatar: res.data.response.players[0].avatar});
      return res.data.response.players[0].avatar;
    }).catch((err) => {
      log('error', err);
    });
  }
}

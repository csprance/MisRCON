/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/18/2016
 * Description:
 */
import axios from 'axios';
import store from 'store';
import {log }from './loggerUtils';
import {apiKey} from '../secrets';

export function getAvatar(steam) {
  log('silly', 'calling Gaben for avatars');
  return axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/', {
    params: {
      key: apiKey,
      steamids: steam
    }
  }).then((res) => {
    // store the player data in local storage
    store.set(steam, {...store.get(steam), avatar: res.data.response.players[0].avatar});
    return res.data.response.players[0].avatar
  }).catch((err) => {
    log('error', err);
  });
}

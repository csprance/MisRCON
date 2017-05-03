/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/13/2016
 * Description:
 *
 */
import parse from 'csv-parse/lib/sync';
import Promise from 'bluebird';
import axios from 'axios';
import fs from 'fs';
import _ from 'lodash';

import {convertTimeStrToDate} from '../utils/dateUtils';

/**
 * Given a string it will return an array of objects that represent a file
 * @param:    {string}   str          a string representing an entire log file
 * @returns:  {Array}    chatEvents   an array of chatEvents
 */
export function eventizeDamageLog(str) {
  //[00:43:11.186] shooterSteamID:76561198081386929, shooterName:"yuju", targetSteamID:76561198338495729, targetName:"hua,zi",
  // weapon:ruger22, distance:5.00, damage:37.34*0.20x=7.47, melee:0, headshot:0, kill:0, part:81(Bip01 L Hand), hitType:ammo_22, projectile:ammo_22
  let eventList = parse(str, {delimiter: ',', relax: true, relax_column_count: true});
  return _.reverse(eventList).map((event) => {
    return {
      type: 'damage',
      time: convertTimeStrToDate(event[0].split(']')[0].replace('[', '').trim()),
      steam: event[0].split(']')[1].replace('shooterSteamID:', '').trim(),
      name: event[1].replace('shooterName:', '').replace('"', '').trim(),
      targetSteam: event[2].replace('targetSteamID:', '').trim(),
      targetName: event[3].replace('targetName:', '').trim(),
      weapon: event[4].replace('weapon:', '').trim(),
      distance: event[5].replace('distance:', '').trim(),
      damage: event[6].replace('damage:', '').trim(),
      melee: event[7].replace('melee:', '').trim(),
      headshot: event[8].replace('headshot:', '').trim(),
      kill: event[9].replace('kill:', '').trim(),
      part: event[10].replace('part:', '').trim(),
      hitType: event[11].replace('hitType:', '').trim(),
      projectile: event[12].replace('projectile:', '').trim(),
    };
  });
}


/**
 * Goes out and gets the damage logs from the server
 * @param:    {string}   userId          userID from i3d for using REST API
 * @param:    {string}   apiKey          apiKey from i3d for using REST API
 * @returns:  {Promise}  promise         A promise that contains a .txt file from the server
 */
export function getDamageLogFromServer(userId, apiKey) {
  return axios.get('').then((data) => {
    console.log(data);
  });
}


/**
 * Goes out and gets the damage logs and eventizes them from the file system
 * @param:    {string}   path          location to the file on the system
 * @returns:  {Promise}   string
 */
export const getDamageLogFromFS = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(eventizeDamageLog(data));
    });
  });
};

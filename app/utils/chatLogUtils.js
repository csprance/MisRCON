/**
 * Name: chatLogUtils
 * Author: Chrissprance
 * Creation Date: 12/13/2016
 * Description: Given a string turn it into an array of javascript objects which represent events
 */
import parse from 'csv-parse/lib/sync';
import axios from 'axios';
import fs from 'fs';

/**
 * Given a string it will return an array of objects that represent a file
 * @param:    {string}   str          a string representing an entire log file
 * @returns:  {Array}    chatEvents   an array of chatEvents
 */
export function eventizeChatLog(str) {
  //[00:03:36] [SteamID 76561198081989790] [Name xLOGANo] [IP 173.218.38.141:64090] were friendly
  let eventList = parse(str, {delimiter: ']', relax: true, relax_column_count: true});
  return eventList.map((event) => {
    return {
      time: event[0].replace('[', '').trim(),
      steam: event[1].replace('[SteamID', '').trim(),
      name: event[2].replace('[Name', '').trim(),
      ip: event[3].replace('[IP', '').trim(),
      msg: event.slice(4).join(' ').trim(),
    }
  });
}


/**
 * Goes out and gets the chat logs from the server
 * @param:    {string}   userId          userID from i3d for using REST API
 * @param:    {string}   apiKey          apiKey from i3d for using REST API
 * @returns:  {Promise}  promise         A promise that contains a .txt file from the server
 */
export function getChatLogFromServer(userId, apiKey) {
  return axios.get('').then((data) => {
    console.log(data);
  });
}


/**
 * Goes out and gets the chat logs and eventizes them from the file system
 * @param:    {string}   path          location to the file on the system
 * @returns:  {Promise}   string
 */
export const getChatLogFromFS = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(eventizeChatLog(data));
    });
  });
};

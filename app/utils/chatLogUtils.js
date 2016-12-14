/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/13/2016
 * Description: Given a string turn it into an array of javascript objects which represent events
 */
import parse from 'csv-parse/lib/sync';
import axios from 'axios';

//[00:03:36] [SteamID 76561198081989790] [Name xLOGANo] [IP 173.218.38.141:64090] were friendly
export function eventizeChatLog(str) {
  let eventList = parse(str, {delimiter: ']'});
  return eventList.map((event) => {
    return {
      time: event[0].replace('[', '').trim(),
      steam: event[1].replace('[SteamID', '').trim(),
      name: event[2].replace('[Name', '').trim(),
      ip: event[3].replace('[IP', '').trim(),
      message: event.slice(4).join(' ').trim(),
    }
  });
}

export function getChatLog(userId, apiKey){

}

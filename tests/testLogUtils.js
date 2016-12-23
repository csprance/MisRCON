/**
 * Name:
 * Author: Chrissprance
 * Creation Date: 12/19/2016
 * Description:
 */
import {getDamageLogFromFS} from '../app/utils/damageLogUtils';
import {getChatLogFromFS} from '../app/utils/chatLogUtils';
import format from 'date-fns/format'


console.log('Start Damage: ', format(Date.now(), 'HH:mm:ss'));
getDamageLogFromFS("C:\\Users\\Chrissprance\\Downloads\\damagelog_2016-11-25.txt").then((data) => {
  console.log('End Damage: ', format(Date.now(), 'HH:mm:ss'));
}).catch((err) => {
  console.log('error: ', format(Date.now(), 'HH:mm:ss'));
  throw err
});


console.log('Start Chat: ', format(Date.now(), 'HH:mm:ss'));
getChatLogFromFS(`C:\\Users\\Chrissprance\\Downloads\\chatlog_2016-12-13.txt`).then((data) => {
  console.log('End Chat: ', format(Date.now(), 'HH:mm:ss'));
}).catch((err) => {
  console.log('error: ', format(Date.now(), 'HH:mm:ss'));
  throw err
});

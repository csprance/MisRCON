/**
 * Name: testCredentialUtils
 * Created by chris on 4/30/2017.
 * Description:
 */
import { credsAreValid } from '../app/utils/credentialsUtils';


console.log('should validate');
console.log(credsAreValid({name: 'test', ip: '192.168.1.1', port: '64099', password: 'password'}));


console.log('bad port');
console.log(credsAreValid({name: 'test', ip: '192.168.1.1', port: '64o99', password: 'password'}));


console.log('no name');
console.log(credsAreValid({name: '', ip: '192.168.1.1', port: '64099', password: 'password'}));


console.log('bad ip');
console.log(credsAreValid({name: 'jake', ip: 'i92.168.1.1', port: '64099', password: 'password'}));


console.log('no password');
console.log(credsAreValid({name: 'jake', ip: '192.168.1.1', port: '64099', password: ''}));



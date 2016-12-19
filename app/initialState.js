/**
 * Name: initialState
 * Author: Chrissprance
 * Creation Date: 12/15/2016
 * Description: These are definitions of state we use throughout the application to refer back to
 * when making design decision on what objects to pass around and use as example values in UI building
 */

export const player = {
  steam: '13371337133713371',
  name: 'Loading',
  avatar: 'http://placehold.it/42x42',
  note: 'Note about a player',
};


export const state = {
  loggedIn: false,
  ip: '192.168.1.1',
  port: '64090',
  password: 'password',
  apiKey: 'rn5gdf54f5g4vs3egv',
  players: [player, player, player],
  banListPlayers: [player, player, player],
  whiteListPlayers: [player, player],
  status: {
    players: '0/36',
    version: '0.0.156.154',
    gameRules: 'mp',
    name: 'Miscreated Official - US75',
  },
  errorText: {
    ip: 'IP address is required',
    port: 'Port is required',
    password: 'Password is required'
  }
};


export const emitter = {
  steam: '76561198064851703',
  name: 'Load Logs to Show Events',
  avatar: 'http://placehold.it/42x42',
  lastUpdate: Date.now(),
  lastMsg: 'to show events',
};

export const chatEvent = {
  id: 21542,
  date: '12-14-2016-10:31.042',
  name: 'Load Logs',
  steam: '76561198064851703',
  ip: '192.168.1.2',
  msg: 'To Show events',
};

export const damageEvent = {
  id: 548318,
  date: '12-14-2016-11:54.047',
  shooterName: 'MarkBob',
  shooterSteam: '06060198064851703',
  targetName: '',
  targetSteam: '16161198064851703',
  weapon: 'Model70',
  distance: '2.56',
  damage: '53.21*1.00x=53.21',
  melee: '0',
  headShot: '0',
  kill: '1',
  part: '23(Bip01 Spine1)',
  hitType: 'ammo_223',
  projectile: 'ammo_223'
};

export const damageEvent2 = {
  id: 548318,
  date: '12-14-2016-11:34.007',
  shooterName: 'MarkBob',
  shooterSteam: '06060198064851703',
  targetName: '',
  targetSteam: '16161198064851703',
  weapon: 'Model70',
  distance: '4.56',
  damage: '53.21*1.00x=53.21',
  melee: '0',
  headShot: '0',
  kill: '0',
  part: '23(Bip01 Spine1)',
  hitType: 'ammo_223',
  projectile: 'ammo_223'
};

export const chatEvent2 = {
  id: 21353,
  date: '12-14-2016-10:33.042',
  name: 'Frank',
  steam: '76561198064851704',
  ip: '192.168.1.100',
  msg: 'Ya Bob! What\'s up?',
};

export const emitter2 = {
  steam: '76561198064851704',
  name: 'Frank',
  avatar: 'http://placehold.it/42x42',
  lastUpdate: Date.now(),
  lastMsg: 'Ya Bob! What\'s up?',
};

export const events = {
  damageEvents: [damageEvent],
  chatEvents: [chatEvent],
};

export const emitters = [emitter];

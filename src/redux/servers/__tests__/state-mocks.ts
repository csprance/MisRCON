import { defaultServer } from '../state';

export const activeServer0 = { ...defaultServer, active: true, id: 0 };
export const inActiveServer1 = { ...defaultServer, active: false, id: -1 };

export const allServers = [activeServer0, inActiveServer1];

import { Server, ServersState } from './types';

export const defaultServer: Server = {
  id: 0,
  avatar: 'https://via.placeholder.com/150/0000FF/808080',
  name: '',
  ip: '',
  port: 0,
  password: '',
  active: true,
  selfHosted: false,
  rootPath: ''
};

export default [] as ServersState;

import { Server, ServersState } from './types';

export const defaultServer: Server = {
  id: 0,
  avatar: 'https://api.adorable.io/avatars/285/' + Date.now(),
  name: '',
  ip: '',
  port: 64094,
  password: '',
  active: true,
  selfHosted: false,
  rootPath: ''
};

export default [] as ServersState;

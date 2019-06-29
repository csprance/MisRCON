import { MisMapState } from './types';

const defaultState: MisMapState = {
  markers: [
    {
      id: 0,
      layer: 'Default Layer',
      posX: -47,
      posY: -23,
      content: 'Test String',
      serverID: -1
    }
  ]
};

export default defaultState;

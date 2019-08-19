import { getMarkersByName } from '../utils';

const markers = [
  {
    id: 0,
    layer: 'Default Layer',
    posX: -47,
    posY: -23,
    content: 'Test String',
    serverID: -1
  },
  {
    id: 1,
    layer: 'Second Layer',
    posX: -47,
    posY: -23,
    content: 'Test String',
    serverID: -1
  },
  {
    id: 2,
    layer: 'Default Layer',
    posX: -47,
    posY: -23,
    content: 'Test String',
    serverID: -1
  }
];

describe('getMarkersByName', () => {
  it('Array passed in', () => {
    const mappedMarkers = getMarkersByName(markers);
    expect(mappedMarkers[0][0]).toEqual('Default Layer');
  });
});

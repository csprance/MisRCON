const main = () => {
  // Do stuff
  const markers = [
    { id: 0, layer: 'Test', posX: -47, posY: -23, content: 'Test String 1' },
    { id: 1, layer: 'Test', posX: -42, posY: -22, content: 'Test String 2' },
    { id: 2, layer: 'Other', posX: -41, posY: -21, content: 'Test String 3' }
  ];
  const byLayer = markers.reduce((acc, val) => {
    if (acc[val.layer]) {
      acc[val.layer].push(val);
    } else {
      acc[val.layer] = [val];
    }
    return acc;
  }, {});
  const keys = Object.keys(byLayer);
  return keys.map(layer => {
    return [layer, ...byLayer[layer]];
  });
};
const results = main();
console.log(results);

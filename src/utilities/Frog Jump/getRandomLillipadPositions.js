import constants from './constants';
const {spawnAreaHeight, spawnAreaWidth, lillipadSize} = constants;
const randomLillipadPositions = num_of_lillipads => {
  let lillipads = [];
  for (let i = 0; i < num_of_lillipads; i++) {
    let newLillipad = {};
    const lillipadMaxTop = spawnAreaHeight - lillipadSize;
    const lillipadMaxLeft = spawnAreaWidth - lillipadSize;
    let lillipadY, lillipadX;
    do {
      lillipadY = Math.floor(Math.random() * lillipadMaxTop);
      lillipadX = Math.floor(Math.random() * lillipadMaxLeft);
    } while (
      lillipads.some(
        lillipad =>
          lillipad.position.x + lillipadSize > lillipadX &&
          lillipad.position.y + lillipadSize > lillipadY &&
          lillipad.position.x < lillipadX + lillipadSize &&
          lillipad.position.y < lillipadY + lillipadSize,
      )
    );
    newLillipad = {
      position: {x: lillipadX, y: lillipadY},
      id: i,
      rotation: Math.floor(Math.random() * 360),
    };
    lillipads.push(newLillipad);
  }
  return lillipads;
};

export default randomLillipadPositions;

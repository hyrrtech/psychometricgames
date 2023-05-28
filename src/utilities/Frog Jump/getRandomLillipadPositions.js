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
          lillipad.x + lillipadSize > lillipadX &&
          lillipad.y + lillipadSize > lillipadY &&
          lillipad.x < lillipadX + lillipadSize &&
          lillipad.y < lillipadY + lillipadSize,
      )
    );
    newLillipad = {x: lillipadX, y: lillipadY};
    lillipads.push(newLillipad);
  }
  return lillipads;
};

export default randomLillipadPositions;

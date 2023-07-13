import constants from './constants';
const {spawnAreaHeight, spawnAreaWidth, shapeSize} = constants;
const getShapePositions = num_of_shapes => {
  let shapes = [];
  for (let i = 0; i < num_of_shapes; i++) {
    let newShape = {};
    const shapeMaxTop = spawnAreaHeight - shapeSize;
    const shapeMaxLeft = spawnAreaWidth - shapeSize;
    let shapeY, shapeX;
    do {
      shapeY = Math.floor(Math.random() * shapeMaxTop);
      shapeX = Math.floor(Math.random() * shapeMaxLeft);
    } while (
      shapes.some(
        shape =>
          shape.position.x + shapeSize > shapeX &&
          shape.position.y + shapeSize > shapeY &&
          shape.position.x < shapeX + shapeSize &&
          shape.position.y < shapeY + shapeSize,
      )
    );
    newShape = {position: {x: shapeX, y: shapeY}, id: i};
    shapes.push(newShape);
  }
  return shapes;
};

export default getShapePositions;

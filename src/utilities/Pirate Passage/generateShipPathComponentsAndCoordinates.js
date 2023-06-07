import Line from '../../components/Pirate Passage/Line';
const generateShipPathComponentsAndCoordinates = (matrix, pathIndexes) => {
  const pathCoordinates = [];
  const pathComponents = [];
  for (let i = 0; i < pathIndexes.indexes.length - 1; i++) {
    const from =
      matrix[pathIndexes.indexes[i][0]][pathIndexes.indexes[i][1]].position;
    const to =
      matrix[pathIndexes.indexes[i + 1][0]][pathIndexes.indexes[i + 1][1]]
        .position;
    const line = Line(from, to, 'treasureShip', 'rgba(255, 255, 255,0.6)', 0);
    pathComponents.push(line);
    pathCoordinates.push(from);
  }
  //push last coordinates
  pathCoordinates.push(
    matrix[pathIndexes.indexes[pathIndexes.indexes.length - 1][0]][
      pathIndexes.indexes[pathIndexes.indexes.length - 1][1]
    ].position,
  );

  return {pathComponents, pathCoordinates};
};

export default generateShipPathComponentsAndCoordinates;

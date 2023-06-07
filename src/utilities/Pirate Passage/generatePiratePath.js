import Line from '../../components/Pirate Passage/Line';

const generatePiratePath = (matrix, piratePathIndexes, color, offset) => {
  const component = [];
  const coordinates = [];
  for (let i = 0; i < piratePathIndexes.length - 1; i++) {
    const from =
      matrix[piratePathIndexes[i][0]][piratePathIndexes[i][1]].position;
    const to =
      matrix[piratePathIndexes[i + 1][0]][piratePathIndexes[i + 1][1]].position;
    const line = Line(from, to, 'pirateShip', color, offset);
    component.push(line);
    coordinates.push({x: from.x - offset, y: from.y - offset});
  }

  //push last coordinates
  const lastCoordinate =
    matrix[piratePathIndexes[piratePathIndexes.length - 1][0]][
      piratePathIndexes[piratePathIndexes.length - 1][1]
    ].position;
  coordinates.push({
    x: lastCoordinate.x - offset,
    y: lastCoordinate.y - offset,
  });

  return {component, coordinates};
};

export default generatePiratePath;

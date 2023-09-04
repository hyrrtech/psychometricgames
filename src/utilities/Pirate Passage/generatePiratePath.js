import Line from '../../components/Pirate Passage/Line';

const generatePiratePath = (matrix, piratePathIndexes, color, offset) => {
  const component = [];
  const coordinates = [];
  for (let i = 0; i < piratePathIndexes.length; i++) {
    const position =
      matrix[piratePathIndexes[i][0]][piratePathIndexes[i][1]].position;
    coordinates.push({x: position.x - offset, y: position.y - offset});

    if (i < piratePathIndexes.length - 1) {
      const nextPosition =
        matrix[piratePathIndexes[i + 1][0]][piratePathIndexes[i + 1][1]]
          .position;
      const line = Line(position, nextPosition, 'pirateShip', color, offset);
      component.push(line);
    }
  }

  return {component, coordinates};
};

export default generatePiratePath;

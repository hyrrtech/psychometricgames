import generatePiratePath from './generatePiratePath';
import constants from './constants';
const {pirateLineWidth} = constants;

const checkIfLoop = path => {
  const firstPoint = path[0];
  const lastPoint = path[path.length - 1];
  if (firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y) {
    return true;
  }
  return false;
};

const getIndexOfInitialPositionOnPath = (pathIndexes, initialPositionIndex) => {
  let index = 0;
  for (let i = 0; i < pathIndexes.length; i++) {
    if (
      pathIndexes[i][0] === initialPositionIndex[0] &&
      pathIndexes[i][1] === initialPositionIndex[1]
    ) {
      index = i;
      break;
    }
  }
  return index;
};

const generatePiratePathComponentsAndCoordiantes = (
  matrix,
  piratePathsIndexes,
) => {
  const piratePathComponents = [];
  const piratePathCoordinates = [];
  for (let i = 0; i < piratePathsIndexes.length; i++) {
    const pivotPoint = piratePathsIndexes.length / 2;
    const offset =
      i < pivotPoint
        ? i * pirateLineWidth * 1.1
        : -(i - pivotPoint) * pirateLineWidth * 1.1;
    const {component, coordinates} = generatePiratePath(
      matrix,
      piratePathsIndexes[i].pathIndexes,
      piratePathsIndexes[i].color,
      offset,
    );
    const initialShipCoordinates =
      matrix[piratePathsIndexes[i].initialShipLocation[0]][
        piratePathsIndexes[i].initialShipLocation[1]
      ].position;

    const offsetInitialShipCoordinates = {
      x: initialShipCoordinates.x - offset,
      y: initialShipCoordinates.y - offset,
    };

    piratePathCoordinates.push({
      pathCoordinates: coordinates,
      initialShipCoordinates: offsetInitialShipCoordinates,
      initialShipCoordinatesIndex: getIndexOfInitialPositionOnPath(
        piratePathsIndexes[i].pathIndexes,
        piratePathsIndexes[i].initialShipLocation,
      ),
      color: piratePathsIndexes[i].color,
      isLoop: checkIfLoop(coordinates),
    });
    piratePathComponents.push(component);
  }

  return {piratePathComponents, piratePathCoordinates};
};

export default generatePiratePathComponentsAndCoordiantes;

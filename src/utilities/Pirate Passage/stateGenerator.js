import generateMatrix from './generateMatrix';
import generatePiratePathComponentsAndCoordiantes from './generatePiratePathComponentsAndCoordinates';
import generateShipPathComponentsAndCoordinates from './generateShipPathComponentsAndCoordinates';
import mapData from './mapData';

const stateGenerator = level => {
  const matrix = generateMatrix(
    mapData[level - 1].matrixSize.rows,
    mapData[level - 1].matrixSize.columns,
    mapData[level - 1].disabledIndexes,
  );
  const shipPathIndexes = {
    indexes: [mapData[level - 1].initialShipIndex],
    number_of_indexes_added: [1],
  };
  const piratePathsIndexes = mapData[level - 1].piratePathsIndexes;

  const {piratePathComponents, piratePathCoordinates} =
    generatePiratePathComponentsAndCoordiantes(matrix, piratePathsIndexes);

  const {pathComponents, pathCoordinates} =
    generateShipPathComponentsAndCoordinates(matrix, shipPathIndexes);
  return {
    matrix,
    initialShipIndex: mapData[level - 1].initialShipIndex,
    shipPathIndexes,
    treasureIndex: mapData[level - 1].treasureIndex,
    piratePathsIndexes,
    level,
    piratePathIndexes: mapData[level - 1].piratePathsIndexes,
    piratePathComponents,
    piratePathCoordinates,
    pathComponents,
    pathCoordinates,
    go: false,
  };
};

export default stateGenerator;

import generateMatrix from './generateMatrix';
import generatePiratePathComponentsAndCoordiantes from './generatePiratePathComponentsAndCoordinates';
import generateShipPathComponentsAndCoordinates from './generateShipPathComponentsAndCoordinates';
import mapData from './mapData';
import demoData from './demoData';

const stateGenerator = (level = 1, ifDemo = false) => {
  const map = ifDemo ? demoData : mapData;
  const matrix = generateMatrix(
    map[level - 1].matrixSize.rows,
    map[level - 1].matrixSize.columns,
    map[level - 1].disabledIndexes,
  );
  const shipPathIndexes = {
    indexes: [map[level - 1].initialShipIndex],
    number_of_indexes_added: [1],
  };
  const piratePathsIndexes = map[level - 1].piratePathsIndexes;

  const {piratePathComponents, piratePathCoordinates} =
    generatePiratePathComponentsAndCoordiantes(matrix, piratePathsIndexes);

  const {pathComponents, pathCoordinates} =
    generateShipPathComponentsAndCoordinates(matrix, shipPathIndexes);
  return {
    tapSequence: ifDemo ? map[level - 1].tapSequence : [[-1, -1]],
    matrix,
    initialShipIndex: map[level - 1].initialShipIndex,
    shipPathIndexes,
    treasureIndex: map[level - 1].treasureIndex,
    piratePathsIndexes,
    level,
    piratePathIndexes: map[level - 1].piratePathsIndexes,
    piratePathComponents,
    piratePathCoordinates,
    pathComponents,
    pathCoordinates,
    go: false,
  };
};

export default stateGenerator;

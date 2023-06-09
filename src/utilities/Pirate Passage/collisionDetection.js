const collisionDetection = (shipPathIndexes, piratePathsIndexes, time) => {
  const steps = time;
  const shipPosition = getShipPosition(shipPathIndexes, steps);
  for (const piratePath of piratePathsIndexes) {
    const piratePosition = getPirateShipPosition(piratePath, steps);
    if (positionsOverlap(shipPosition, piratePosition)) {
      return {collided: true, shipPosition};
    }
  }
  return {collided: false, shipPosition};
};

function getShipPosition(path, steps) {
  const positionIndex = Math.min(steps, path.length - 1);
  return path[positionIndex];
}

function getPirateShipPosition(path, steps) {
  if (checkIfLoop(path)) {
    let {pathIndexes, moveDirection} = path;
    const reversedPathIndexes =
      moveDirection === -1 ? [...pathIndexes].reverse() : [...pathIndexes];
    reversedPathIndexes.pop();
    let index = steps % reversedPathIndexes.length;

    return reversedPathIndexes[index];
  } else {
    let index = -1;
    let {moveDirection, pathIndexes, initialShipLocation} = path;
    for (let i = 0; i < pathIndexes.length; i++) {
      if (positionsOverlap(pathIndexes[i], initialShipLocation)) {
        index = i;
        break;
      }
    }
    for (let i = 0; i < steps; i++) {
      index += moveDirection;
      if (index === pathIndexes.length - 1 || index === 0) {
        moveDirection *= -1;
      }
    }
    return pathIndexes[index];
  }
}

function positionsOverlap(position1, position2) {
  return position1[0] === position2[0] && position1[1] === position2[1];
}

function checkIfLoop(path) {
  const {pathIndexes} = path;
  const first = pathIndexes[0];
  const last = pathIndexes[pathIndexes.length - 1];
  return first[0] === last[0] && first[1] === last[1];
}

export default collisionDetection;

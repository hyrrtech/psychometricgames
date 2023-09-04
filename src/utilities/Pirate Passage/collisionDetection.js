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
  const {pathIndexes, moveDirection, initialShipLocation} = path;

  const PathIndexes =
    moveDirection === -1 ? [...pathIndexes].reverse() : [...pathIndexes];
  if (checkIfLoop(path)) {
    PathIndexes.pop();
    let index = steps % PathIndexes.length;
    return PathIndexes[index];
  } else {
    let index = -1;

    for (let i = 0; i < PathIndexes.length; i++) {
      if (positionsOverlap(PathIndexes[i], initialShipLocation)) {
        index = i;
        break;
      }
    }
    let direction = 1;

    for (let i = 0; i < steps; i++) {
      if (index === PathIndexes.length - 1) {
        direction *= -1;
      }
      if (index === 0) {
        direction = 1;
      }

      index += direction;
    }

    return PathIndexes[index];
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
export {getShipPosition, getPirateShipPosition, positionsOverlap, checkIfLoop};
export default collisionDetection;

const collisionDetection = (shipPathIndexes, piratePathsIndexes, time) => {
  const steps = time;
  const shipPosition = getShipPosition(shipPathIndexes, steps);
  for (const piratePath of piratePathsIndexes) {
    const piratePosition = getPirateShipPosition(piratePath, steps);
    // console.log(shipPosition, piratePosition);
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
    const {pathIndexes} = path;
    const PathIndexes = [...pathIndexes];
    PathIndexes.pop();
    let index = steps % PathIndexes.length;
    return PathIndexes[index];
  } else {
    let index = -1;
    let {pathIndexes, moveDirection, initialShipLocation} = path;

    for (let i = 0; i < pathIndexes.length; i++) {
      if (positionsOverlap(pathIndexes[i], initialShipLocation)) {
        index = i;
        break;
      }
    }
    let direction = 1;

    for (let i = 0; i < steps; i++) {
      if (index === pathIndexes.length - 1 || index === 0) {
        direction *= -1;
      }

      index += direction;
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

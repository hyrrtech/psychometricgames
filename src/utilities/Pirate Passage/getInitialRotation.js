const getInitialRotation = (
  moveDirection,
  initialPosition,
  initialPositionIndex,
  shipPath,
) => {
  const shipPathLength = shipPath.length;
  const initialPositionIndexIsLast =
    initialPositionIndex === shipPathLength - 1;
  const positionNextToInitialPosition = !initialPositionIndexIsLast
    ? shipPath[initialPositionIndex + 1]
    : shipPath[initialPositionIndex - 1];
  const deltaX = positionNextToInitialPosition.x - initialPosition.x;
  if (deltaX === 0) {
    return `${180 * moveDirection}deg`;
  } else {
    return `${90 * moveDirection}deg`;
  }
};

export default getInitialRotation;

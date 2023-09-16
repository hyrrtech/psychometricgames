const getInitialRotation = (
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
  const deltaY = positionNextToInitialPosition.y - initialPosition.y;

  const angleInRadians = Math.atan2(deltaY, deltaX);

  const angleInDegrees = (angleInRadians * 180) / Math.PI;

  let finalAngle = angleInDegrees + 90;

  return `${finalAngle}deg`;
};

export default getInitialRotation;

import constants from './constants';
const {leaderFrogSize, lillipadSize, followerFrogSize} = constants;
const getInitialLeaderFrogPosition = (
  frogPositions,
  initialFrogPositionIndex,
) => {
  let leaderFrogPositionInitialIndex = Math.floor(
    Math.random() * frogPositions.length,
  );
  while (leaderFrogPositionInitialIndex === initialFrogPositionIndex) {
    leaderFrogPositionInitialIndex = Math.floor(
      Math.random() * frogPositions.length,
    );
  }
  return {
    x:
      frogPositions[leaderFrogPositionInitialIndex].x -
      (lillipadSize - followerFrogSize) / 2 +
      (lillipadSize - leaderFrogSize) / 2,
    y:
      frogPositions[leaderFrogPositionInitialIndex].y -
      (lillipadSize - followerFrogSize) / 2 +
      (lillipadSize - leaderFrogSize) / 2,
  };
};

export default getInitialLeaderFrogPosition;

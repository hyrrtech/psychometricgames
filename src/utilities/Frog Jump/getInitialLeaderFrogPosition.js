import constants from './constants';
const {leaderFrogSize, lillipadSize, followerFrogSize} = constants;
const getInitialLeaderFrogPosition = (
  lillipadPositions,
  initialFrogPositionIndex,
) => {
  let leaderFrogPositionInitialIndex = Math.floor(
    Math.random() * lillipadPositions.length,
  );
  while (leaderFrogPositionInitialIndex === initialFrogPositionIndex) {
    leaderFrogPositionInitialIndex = Math.floor(
      Math.random() * lillipadPositions.length,
    );
  }
  return {
    position: {
      ...lillipadPositions[leaderFrogPositionInitialIndex].position,
    },
    id: leaderFrogPositionInitialIndex,
  };
};

export default getInitialLeaderFrogPosition;

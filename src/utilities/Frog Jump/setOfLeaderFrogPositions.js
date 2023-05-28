import constants from './constants';
const {lillipadSize, followerFrogSize, leaderFrogSize} = constants;
const generateSetOfLeaderFrogPositions = (
  followerFrogPosition,
  recentLeaderFrogPositions,
  frogPositions,
  number_of_positions,
) => {
  let setOfLeaderFrogPositions = [];
  let choosenFrogPositions = [];
  const indexesOfRecentLeaderFrogPositions = recentLeaderFrogPositions
    .getArray()
    .map(item =>
      frogPositions.findIndex(
        frogPosition =>
          frogPosition.x ===
            item.x -
              (lillipadSize - leaderFrogSize) / 2 +
              (lillipadSize - followerFrogSize) / 2 &&
          frogPosition.y ===
            item.y -
              (lillipadSize - leaderFrogSize) / 2 +
              (lillipadSize - followerFrogSize) / 2,
      ),
    );
  const indexOfFollowerFrogPosition = frogPositions.findIndex(
    item =>
      item.x === followerFrogPosition.x && item.y === followerFrogPosition.y,
  );
  for (let i = 0; i < number_of_positions; i++) {
    let newPositionIndex = Math.floor(Math.random() * frogPositions.length);

    while (
      choosenFrogPositions.includes(newPositionIndex) ||
      newPositionIndex === indexOfFollowerFrogPosition ||
      indexesOfRecentLeaderFrogPositions.includes(newPositionIndex)
    ) {
      newPositionIndex = Math.floor(Math.random() * frogPositions.length);
    }
    console.log(
      newPositionIndex,
      indexesOfRecentLeaderFrogPositions,
      indexOfFollowerFrogPosition,
    );
    choosenFrogPositions.push(newPositionIndex);

    let leaderFrogPosition = {
      x:
        frogPositions[newPositionIndex].x -
        (lillipadSize - followerFrogSize) / 2 +
        (lillipadSize - leaderFrogSize) / 2,
      y:
        frogPositions[newPositionIndex].y -
        (lillipadSize - followerFrogSize) / 2 +
        (lillipadSize - leaderFrogSize) / 2,
    };
    setOfLeaderFrogPositions.push(leaderFrogPosition);
  }

  return setOfLeaderFrogPositions;
};

export default generateSetOfLeaderFrogPositions;

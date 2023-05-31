import constants from './constants';
const {lillipadSize, followerFrogSize, leaderFrogSize} = constants;
const generateSetOfLeaderFrogPositions = (
  currentLeaderFrogPosition,
  recentFollowerFrogPositions,
  frogPositions,
  number_of_positions,
) => {
  let setOfLeaderFrogPositions = [];
  let choosenFrogPositions = [];
  const indexesOfRecentFollowerFrogPositions = recentFollowerFrogPositions
    .getArray()
    .map(item =>
      frogPositions.findIndex(
        frogPosition => frogPosition.x === item.x && frogPosition.y === item.y,
      ),
    );
  const indexOfCurrentLeaderFrogPosition = frogPositions.findIndex(
    frogPosition =>
      frogPosition.x ===
        currentLeaderFrogPosition.x -
          (lillipadSize - leaderFrogSize) / 2 +
          (lillipadSize - followerFrogSize) / 2 &&
      frogPosition.y ===
        currentLeaderFrogPosition.y -
          (lillipadSize - leaderFrogSize) / 2 +
          (lillipadSize - followerFrogSize) / 2,
  );
  console.log(
    indexOfCurrentLeaderFrogPosition,
    indexesOfRecentFollowerFrogPositions,
  );
  for (let i = 0; i < number_of_positions; i++) {
    let newPositionIndex = Math.floor(Math.random() * frogPositions.length);

    while (
      choosenFrogPositions.includes(newPositionIndex) ||
      indexOfCurrentLeaderFrogPosition === newPositionIndex ||
      indexesOfRecentFollowerFrogPositions.includes(newPositionIndex)
    ) {
      newPositionIndex = Math.floor(Math.random() * frogPositions.length);
    }
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

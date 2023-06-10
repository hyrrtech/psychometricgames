const generateSetOfLeaderFrogPositions = (
  currentLeaderFrogPosition,
  currentAndFutureFollowerFrogPositions,
  lillipadPositions,
  number_of_positions,
) => {
  let setOfLeaderFrogPositions = [];
  let choosenFrogPositions = [];

  const indexesOfCurrentAndFutureFollowerFrogPositions =
    currentAndFutureFollowerFrogPositions.getArray().map(item => item.id);
  const indexOfCurrentLeaderFrogPosition = currentLeaderFrogPosition.id;
  console.log(
    indexOfCurrentLeaderFrogPosition,
    indexesOfCurrentAndFutureFollowerFrogPositions,
  );
  for (let i = 0; i < number_of_positions; i++) {
    let newPositionIndex = Math.floor(Math.random() * lillipadPositions.length);

    while (
      choosenFrogPositions.includes(newPositionIndex) ||
      indexOfCurrentLeaderFrogPosition === newPositionIndex ||
      indexesOfCurrentAndFutureFollowerFrogPositions.includes(newPositionIndex)
    ) {
      newPositionIndex = Math.floor(Math.random() * lillipadPositions.length);
    }
    choosenFrogPositions.push(newPositionIndex);

    let leaderFrogPosition = lillipadPositions[newPositionIndex];
    setOfLeaderFrogPositions.push(leaderFrogPosition);
  }

  return setOfLeaderFrogPositions;
};

export default generateSetOfLeaderFrogPositions;

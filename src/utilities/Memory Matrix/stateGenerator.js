import {gameRoundData, generateMatrix, generateEmptyMatrix} from '.';

const stateGenerator = level => {
  return {
    lives: 5,
    score: 0,
    status: 'IN_PROGRESS',
    level: gameRoundData[level - 1].level,
    correctScreenTime: gameRoundData[level - 1].correctScreenTime,
    rightAnswerCount: 0,
    correctTileCount: gameRoundData[level - 1].correctTileCount,
    remainingClickCount: gameRoundData[level - 1].correctTileCount,
    matrix: generateMatrix(
      gameRoundData[level - 1].nTile,
      gameRoundData[level - 1].correctTileCount,
    ),
    userMatrix: generateEmptyMatrix(gameRoundData[level - 1].nTile),
  };
};

export default stateGenerator;

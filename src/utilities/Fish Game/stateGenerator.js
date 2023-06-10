import {gameRoundData, generateFish} from '.';

const stateGenerator = level => {
  return {
    status: 'IN_PROGRESS',
    level: gameRoundData[level - 1].level,
    baitCount: gameRoundData[level - 1].baitCount,
    fish: generateFish(gameRoundData[level - 1].fishCount),
  };
};

export default stateGenerator;

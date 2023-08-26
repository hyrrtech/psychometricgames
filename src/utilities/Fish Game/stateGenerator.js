import {gameRoundData, generateFish, randomRaindropPositions} from '.';

const stateGenerator = level => {
  return {
    status: 'IN_PROGRESS',
    level: gameRoundData[level - 1].level,
    baitCount: gameRoundData[level - 1].baitCount,
    lives: gameRoundData[level - 1].lives,
    fish: generateFish(gameRoundData[level - 1].fishCount),
    rainDrops: randomRaindropPositions(gameRoundData[level - 1].rainDropCount),
  };
};

export default stateGenerator;

import {gameRoundData} from '.';

const stateGenerator = level => {
  return {
    score: 0,
    status: 'IN_PROGRESS',
    level: gameRoundData[level - 1].level,
    totalLevels: gameRoundData.length,
    duration: gameRoundData[level - 1].duration,
    spawnSpeed: gameRoundData[level - 1].spawnSpeed,
    correctStations: 0,
    incorrectStations: 0,
  };
};

export default stateGenerator;

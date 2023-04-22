import {gameRoundData} from '.';

const stateGenerator = level => {
  return {
    score: 0,
    status: 'IN_PROGRESS',
    level: gameRoundData[level - 1].level,
    duration: gameRoundData[level - 1].duration,
    spawnSpeed: gameRoundData[level - 1].spawnSpeed,
    correctDestinations: 0,
    incorrectDestinations: 0,
  };
};

export default stateGenerator;

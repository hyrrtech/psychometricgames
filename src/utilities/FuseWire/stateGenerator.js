import generateSequence from './generateSequence';
import getHolderPositions from './getHolderPositions';
import gameRoundData from './gameRoundData';

const stateGenerator = level => {
  const {difficulty, sequence_size} = gameRoundData[level - 1];
  const {fuseHolderData, blankValues} = getHolderPositions(
    generateSequence(difficulty, sequence_size),
  );
  return {
    fuseHolders: fuseHolderData,
    blankValues: blankValues,
    level: level,
  };
};

export default stateGenerator;

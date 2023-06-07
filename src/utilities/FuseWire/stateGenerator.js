import generateSequence from './generateSequence';
import getHolderPositions from './getHolderPositions';
import gameRoundData from './gameRoundData';
// import functions from '@react-native-firebase/functions';

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

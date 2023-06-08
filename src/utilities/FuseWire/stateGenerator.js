import generateSequence from './generateSequence';
import getHolderPositions from './getHolderPositions';
import gameRoundData from './gameRoundData';
import functions from '@react-native-firebase/functions';
const fun = functions().httpsCallable('generateSequence');

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

const stateGeneratorAsync = level => {
  const {difficulty, sequence_size} = gameRoundData[level - 1];
  return new Promise((resolve, reject) => {
    fun({difficulty: difficulty, sequence_size: sequence_size})
      .then(res => {
        const {fuseHolderData, blankValues} = getHolderPositions(res.data);
        resolve({
          fuseHolders: fuseHolderData,
          blankValues: blankValues,
          level: level,
        });
      })
      .catch(err => reject(err));
  });
};

export {stateGeneratorAsync, stateGenerator};

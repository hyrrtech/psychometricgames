import getHolderPositions from './getHolderPositions';
import gameRoundData from './gameRoundData';
import getFusePositions from './getFusePositions';
import generateCloseValues from './generateCloseValues';
import functions from '@react-native-firebase/functions';
const fun = functions().httpsCallable('generateSequence');

const stateGeneratorAsync = level => {
  const {difficulty, sequence_size} = gameRoundData[level - 1];

  return new Promise((resolve, reject) => {
    fun({difficulty: difficulty, sequence_size: sequence_size})
      .then(res => {
        const {fuseHolderData, blankValues} = getHolderPositions(res.data);
        const fuse = getFusePositions([
          ...blankValues,
          ...generateCloseValues(blankValues),
        ]);
        resolve({
          fuseHolders: fuseHolderData,
          blankValues: blankValues,
          fuse: fuse,
          level: level,
        });
      })
      .catch(err => reject(err));
  });
};

export default stateGeneratorAsync;

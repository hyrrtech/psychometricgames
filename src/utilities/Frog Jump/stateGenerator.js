import CircularBuffer from '../CircularBuffer.js';
import getInitialLeaderFrogPosition from './getInitialLeaderFrogPosition.js';
import randomLillipadPositions from './getRandomLillipadPositions.js';
import generateSetOfLeaderFrogPositions from './setOfLeaderFrogPositions.js';

const stateGenerator = num_of_lillipads => {
  const lillipadPositions = randomLillipadPositions(num_of_lillipads);
  const initialFollowerFrogPosition =
    lillipadPositions[Math.floor(Math.random() * lillipadPositions.length)];

  const initialLeaderFrogPosition = getInitialLeaderFrogPosition(
    lillipadPositions,
    initialFollowerFrogPosition.id,
  );
  const circularBuffer = new CircularBuffer(3);
  circularBuffer.push(initialFollowerFrogPosition);

  const initialSetOfLeaderFrogPositions = generateSetOfLeaderFrogPositions(
    initialLeaderFrogPosition,
    circularBuffer,
    lillipadPositions,
    3,
  );
  return {
    initialFollowerFrogPosition,
    initialLeaderFrogPosition,
    lillipadPositions,
    circularBuffer,
    initialSetOfLeaderFrogPositions,
  };
};

export default stateGenerator;

import constants from './constants';
const {ratio} = constants;

const populatePositions = elementsData => {
  const positionsState = [];
  for (let i = 0; i < elementsData.length; i++) {
    const piece = elementsData[i];
    positionsState.push({
      id: piece.id,
      position: piece.pieceCorrectPositon,
      isBlank: true,
    });
  }

  return positionsState;
};

export default populatePositions;

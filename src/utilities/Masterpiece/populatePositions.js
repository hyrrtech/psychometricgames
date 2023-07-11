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
    // const variations = [
    // [0, (piece.viewBox.height * ratio) / 1.5],
    // [0, -(piece.viewBox.height * ratio) / 1.5],
    // [(piece.viewBox.width * ratio) / 2, 0],
    // [-(piece.viewBox.width * ratio) / 2, 0],
    // ];
    // for (let j = 0; j < variations.length; j++) {
    //   const variation = variations[j];
    //   positionsState.push({
    //     id: `${piece.id}-${j}`,
    //     position: {
    //       x: piece.pieceCorrectPositon.x + variation[0],
    //       y: piece.pieceCorrectPositon.y + variation[1],
    //     },
    //     isBlank: true,
    //   });
    // }
  }

  return positionsState;
};

export default populatePositions;

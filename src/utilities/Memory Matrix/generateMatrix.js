const generateMatrix = function (nTile, correctTileCount) {
  let matrix = [];
  let tile = null;

  for (let i = 0; i < nTile; i++) {
    let row = [];
    for (let j = 0; j < nTile; j++) {
      tile = {
        index: i * nTile + j,
        isCorrect: false,
        isSelected: false,
        isLastClick: false,
      };
      row.push(tile);
    }
    matrix.push(row);
  }

  while (correctTileCount > 0) {
    let randomRowIndex = Math.floor(Math.random() * nTile);
    let randomColIndex = Math.floor(Math.random() * nTile);
    tile = matrix[randomRowIndex][randomColIndex];
    if (!tile.isCorrect) {
      tile.isCorrect = true;
      correctTileCount--;
    }
  }

  return matrix;
};

export default generateMatrix;

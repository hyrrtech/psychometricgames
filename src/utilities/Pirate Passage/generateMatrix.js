import constants from './constants';
const {WINDOW_HEIGHT, WINDOW_WIDTH, tileSize} = constants;

const generateMatrix = (row, col, disabledIndexes) => {
  const gap = (WINDOW_HEIGHT / WINDOW_WIDTH) * 2;
  const totalWidth = tileSize * col + gap * (col - 1);
  const totalHeight = tileSize * row + gap * (row - 1);
  const intialX = WINDOW_WIDTH / 2 - totalWidth / 2 + tileSize / 2;
  const intialY = WINDOW_HEIGHT / 2 - totalHeight / 2 + tileSize / 2;

  const matrix = [];
  for (let i = 0; i < row; i++) {
    const row = [];
    for (let j = 0; j < col; j++) {
      row.push({
        position: {
          x: intialX + j * (tileSize + gap),
          y: intialY + i * (tileSize + gap),
        },
        index: [i, j],
        disabled: disabledIndexes.some(
          index => index[0] === i && index[1] === j,
        ),
      });
    }
    matrix.push(row);
  }
  return matrix;
};

export default generateMatrix;

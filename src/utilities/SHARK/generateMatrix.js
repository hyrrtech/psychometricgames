function getSharkDirection() {
  return Math.random() < 0.5 ? 'LEFT' : 'RIGHT';
}

function generateMatrix(rows, columns, emptyProb = 0.4) {
  let matrix = new Array(rows);
  let emptyCornerGenerated = false; //to ensure that no more than one corner is empty

  //get middle row and column index
  const middleRow = Math.floor(rows / 2);
  const middleCol = Math.floor(columns / 2);

  for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      if (i === middleRow && j === middleCol) {
        matrix[i][j] = getSharkDirection();
      } else if (
        //check for corners
        (i === 0 && j === 0) ||
        (i === 0 && j === columns - 1) ||
        (i === rows - 1 && j === 0) ||
        (i === rows - 1 && j === columns - 1)
      ) {
        if (emptyCornerGenerated || Math.random() < emptyProb) {
          matrix[i][j] = getSharkDirection();
        } else {
          matrix[i][j] = '';
          emptyCornerGenerated = true;
        }
      } else if (Math.random() < emptyProb) {
        matrix[i][j] = '';
      } else {
        matrix[i][j] = getSharkDirection();
      }
    }
  }

  return matrix;
}
export default generateMatrix;

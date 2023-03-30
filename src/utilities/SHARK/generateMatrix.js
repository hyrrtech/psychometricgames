function generateMatrix(rows, columns, emptyProb = 0.3) {
  let matrix = new Array(rows);
  let emptyCornerGenerated = false; //to ensure that no more than one column is empty

  //get middle row and column index
  const middleRow =
    matrix.length % 2 === 0
      ? Math.floor(matrix.length / 2) - 1
      : Math.floor(matrix.length / 2);
  const middleCol = Math.floor(columns / 2);

  for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      if (i === middleRow && j === middleCol) {
        matrix[i][j] = Math.random() < 0.5 ? 'LEFT' : 'RIGHT';
      } else if (
        //check for corners
        (i === 0 && j === 0) ||
        (i === 0 && j === columns - 1) ||
        (i === rows - 1 && j === 0) ||
        (i === rows - 1 && j === columns - 1)
      ) {
        if (emptyCornerGenerated || Math.random() < emptyProb) {
          matrix[i][j] = Math.random() < 0.5 ? 'LEFT' : 'RIGHT';
        } else {
          matrix[i][j] = '';
          emptyCornerGenerated = true;
        }
      } else if (Math.random() < emptyProb) {
        matrix[i][j] = '';
      } else {
        matrix[i][j] = Math.random() < 0.5 ? 'LEFT' : 'RIGHT';
      }
    }
  }
  return matrix;
}
export default generateMatrix;

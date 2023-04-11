function createEmptyMatrix(n) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push(new Array(n).fill(''));
  }
  return matrix;
}

export default createEmptyMatrix;

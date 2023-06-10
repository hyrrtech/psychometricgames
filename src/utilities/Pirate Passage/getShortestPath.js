const getShortestPath = (matrix, start, end) => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Define the four possible directions: up, down, left, right
  const directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  // Create a visited matrix to track visited cells
  const visited = Array.from({length: rows}, () => Array(cols).fill(false));

  // Create a queue for BFS traversal
  const queue = [[start, []]];

  while (queue.length > 0) {
    const [current, path] = queue.shift();
    const [row, col] = current;

    // Check if the current cell is the destination
    if (row === end[0] && col === end[1]) {
      return [...path, current];
    }

    // Mark the current cell as visited
    visited[row][col] = true;

    // Explore the neighbors
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      // Check if the new position is valid and unvisited
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !visited[newRow][newCol]
      ) {
        queue.push([
          [newRow, newCol],
          [...path, current],
        ]);
        visited[newRow][newCol] = true; // Mark the neighbor as visited
      }
    }
  }

  // No path found
  return null;
};

export default getShortestPath;

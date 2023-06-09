const mapData = [
  {
    level: 1,
    matrixSize: {rows: 7, columns: 5},
    initialShipIndex: [0, 0],
    treasureIndex: [6, 4],
    piratePathsIndexes: [
      {
        pathIndexes: [
          [1, 1],
          [1, 2],
          [1, 3],
          [1, 4],
          [2, 4],
          [3, 4],
          [3, 3],
          [3, 2],
          [3, 1],
          [2, 1],
          [1, 1],
        ],
        color: 'rgba(36, 180, 132,0.9)',
        initialShipLocation: [1, 1],
        moveDirection: 1,
      },
      {
        pathIndexes: [
          [6, 0],
          [6, 1],
          [5, 1],
          [5, 2],
        ],
        color: 'rgba(201, 71, 39,0.9)',
        initialShipLocation: [5, 1],
        moveDirection: 1,
      },
      {
        pathIndexes: [
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [5, 1],
        ],
        color: 'rgba(155, 41, 81,0.9)',
        initialShipLocation: [4, 1],
        moveDirection: 1,
      },
      {
        pathIndexes: [
          [1, 3],
          [2, 3],
          [3, 3],
          [4, 3],
          [5, 3],
        ],
        color: 'blue',
        initialShipLocation: [1, 3],
        moveDirection: 1,
      },
      {
        pathIndexes: [
          [4, 2],
          [4, 3],
          [4, 4],
          [5, 4],
          [5, 3],
          [5, 2],
        ],
        color: 'green',
        initialShipLocation: [4, 2],
        moveDirection: 1,
      },

      {
        pathIndexes: [
          [0, 2],
          [0, 3],
          [1, 3],
          [2, 3],
          [2, 2],
          [1, 2],
          [0, 2],
        ],
        color: 'pink',
        initialShipLocation: [0, 2],
        moveDirection: 1,
      },
    ],
  },
];
export default mapData;

const mapData = [
  {
    level: 1,
    matrixSize: {rows: 7, columns: 5},
    initialShipIndex: [0, 0],
    treasureIndex: [6, 4],
    disabledIndexes: [[0, 1]],
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
        color: '#2daf84',
        initialShipLocation: [1, 1],
        moveDirection: -1,
      },
      {
        pathIndexes: [
          [6, 0],
          [6, 1],
          [5, 1],
          [5, 2],
        ],
        color: '#c14c2f',
        initialShipLocation: [5, 1],
        moveDirection: -1,
      },
      {
        pathIndexes: [
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [5, 1],
          [5, 2],
        ],
        color: '#962f53',
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
        color: '#41a5ee',
        initialShipLocation: [1, 3],
        moveDirection: -1,
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
        color: '#159944',
        initialShipLocation: [4, 2],
        moveDirection: -1,
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
        color: '#ffc0cb',
        initialShipLocation: [0, 2],
        moveDirection: -1,
      },
    ],
  },
];
export default mapData;

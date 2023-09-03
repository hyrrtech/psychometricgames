const demoData = [
  {
    level: 1,
    matrixSize: {rows: 3, columns: 5},
    initialShipIndex: [0, 2],
    treasureIndex: [1, 2],
    tapSequence: [
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    disabledIndexes: [
      [0, 0],
      [2, 1],
      [2, 3],
      [1, 4],
    ],
    piratePathsIndexes: [
      {
        pathIndexes: [
          [1, 1],
          [1, 2],
          [1, 3],
          [1, 4],
          [0, 4],
          [0, 3],
          [0, 2],
          [0, 1],
          [1, 1],
        ],
        color: '#922c53',
        initialShipLocation: [1, 1],
        moveDirection: 1,
      },
    ],
  },
];
export default demoData;

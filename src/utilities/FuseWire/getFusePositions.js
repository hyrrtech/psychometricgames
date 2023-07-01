import constants from './constants';
const {
  WindowHeight,
  WindowWidth,
  FuseHeight,
  fuseComponentLeftOffset,
  FuseWidth,
  horizontal_gap,
  vertical_gap,
} = constants;

const getFusePositions = values => {
  const numberOfElements = values.length;
  const numberOfRows = Math.ceil(numberOfElements / 2);

  const totalHeight =
    FuseHeight * numberOfRows + vertical_gap * (numberOfRows - 1);
  const initialX = fuseComponentLeftOffset;
  const initialY = WindowHeight / 2 - totalHeight / 2 + FuseHeight / 2;

  const matrix = [];
  let valueIndex = 0;

  for (let i = 0; i < numberOfRows; i++) {
    const row = [];

    for (let j = 0; j < 2; j++) {
      const value = values[valueIndex];

      const position = {
        x: initialX + j * (FuseWidth + horizontal_gap),
        y: initialY + i * (FuseHeight + vertical_gap),
      };

      const element = {
        position: position,
        value: value,
      };
      row.push(element);
      valueIndex++;

      if (valueIndex >= numberOfElements) {
        break;
      }
    }

    matrix.push(row);
  }

  return matrix;
};

export default getFusePositions;

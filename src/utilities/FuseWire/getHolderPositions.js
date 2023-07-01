import constants from './constants';
const {
  WindowHeight,
  WindowWidth,
  FuseHolderHeight,
  FuseHolderWidth,
  vertical_gap,
  holderComponentRightOffset,
} = constants;

const getHolderPositions = rowData => {
  const rowLength = rowData.sequence.length;

  const totalHeight =
    FuseHolderHeight * rowLength + vertical_gap * (rowLength - 1);
  const initialX = WindowWidth - holderComponentRightOffset;
  const initialY = WindowHeight / 2 - totalHeight / 2 + FuseHolderHeight / 2;

  const number_of_blank_positions = Math.floor(rowData.sequence.length / 2);
  const patternLengths = rowData.pattern.map(pattern => pattern.length);
  const blank_positions_indices = getRandomIndices(
    rowLength,
    number_of_blank_positions,
    patternLengths,
  );
  const blank_values = blank_positions_indices.map(
    index => rowData.sequence[index],
  );

  const newRowData = [];

  for (let j = 0; j < rowLength; j++) {
    newRowData.push({
      position: {
        x: initialX,
        y: initialY + j * (FuseHolderHeight + vertical_gap),
      },
      sequence: rowData.sequence[j],
      pattern: rowData.pattern[j],
      initiallyBlank: blank_positions_indices.includes(j),
      isBlank: blank_positions_indices.includes(j),
      id: j,
      inputValue: blank_positions_indices.includes(j)
        ? null
        : rowData.sequence[j],
    });
  }

  return {fuseHolderData: newRowData, blankValues: blank_values};
};

// Helper function to generate random indices for blank positions
const getRandomIndices = (arrayLength, numIndices, patternLengths) => {
  const indices = Array.from({length: arrayLength}, (_, index) => index);
  const availableIndices = indices.filter(index => patternLengths[index] > 0);
  const randomIndices = [];

  while (randomIndices.length < numIndices) {
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const selectedIndex = availableIndices[randomIndex];
    randomIndices.push(selectedIndex);
    availableIndices.splice(randomIndex, 1);
  }

  return randomIndices;
};

export default getHolderPositions;

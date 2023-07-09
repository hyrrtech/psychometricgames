import constants from './constants';
import getBBoxFromD from '../getBBoxFromD';
const {ratio} = constants;

export const getDimFromViewBox = viewBox => {
  const [width, height] = viewBox.split(' ').filter(dim => {
    if (dim !== '0') return parseFloat(dim);
  });
  return {height, width};
};

export const getPathsData = (
  paths,
  combinedPiecePosition,
  combinedPieceDimensions,
) => {
  let data = [];
  const {x, y} = combinedPiecePosition;
  const {height: combinedPieceHeight, width: combinedPieceWidth} =
    combinedPieceDimensions;
  for (const key in paths) {
    const viewBox = getBBoxFromD(paths[key]);

    const pieceCorrectPositon = {
      x:
        x +
        viewBox.x * ratio +
        (viewBox.width * ratio) / 2 -
        (combinedPieceWidth * ratio) / 2,
      y:
        y +
        viewBox.y * ratio +
        (viewBox.height * ratio) / 2 -
        (combinedPieceHeight * ratio) / 2,
    };
    data.push({id: key, path: paths[key], viewBox, pieceCorrectPositon});
  }
  return data;
};

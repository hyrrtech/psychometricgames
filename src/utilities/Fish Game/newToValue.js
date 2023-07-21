import constants from './constants';
const {poundAreaHeight, poundAreaWidth} = constants;
const newToValue = prev => {
  const minX = poundAreaWidth * 0.05;
  const maxX = poundAreaWidth * 0.9;
  const minY = poundAreaHeight * 0.05;
  const maxY = poundAreaHeight * 0.9;

  let x = Math.random() * (maxX - minX) + minX;
  let y = Math.random() * (maxY - minY) + minY;

  while (
    prev &&
    Math.abs(x - prev.x) < maxX * 0.4 &&
    Math.abs(y - prev.y) < maxY * 0.4
  ) {
    x = Math.random() * (maxX - minX) + minX;
    y = Math.random() * (maxY - minY) + minY;
  }

  return {x, y};
};

export default newToValue;

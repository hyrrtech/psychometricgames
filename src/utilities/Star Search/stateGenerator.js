import gameLevelData from './gameLevelData';
import generateShapeData from './generateShapeData';
import getShapePositions from './getShapePositions';

const combinePositionAndStyle = (shapePositions, shapeStyles) => {
  let combinedArray = [];
  let j = 0;
  for (let [key, value] of shapeStyles) {
    for (let k = 0; k < value.count; k++) {
      combinedArray.push({
        position: shapePositions[j].position,
        id: shapePositions[j].id,
        ...value,
      });
      j++;
    }
  }

  return combinedArray;
};

const stateGenerator = level => {
  let {
    num_of_shapes,
    num_of_unique_styles,
    num_of_unique_colors,
    num_of_unique_shapes,
    isAnimated,
    isRotated,
    hasPattern,
    rounds,
    scorePayload,
  } = gameLevelData[level - 1];

  const randomNum = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  num_of_shapes = randomNum(num_of_shapes[0], num_of_shapes[1]);

  const shapePositions = getShapePositions(num_of_shapes);

  const shapeStyles = generateShapeData(
    num_of_shapes,
    num_of_unique_styles,
    num_of_unique_colors,
    num_of_unique_shapes,
    isRotated,
    isAnimated,
    hasPattern,
  );
  const shapeData = combinePositionAndStyle(shapePositions, shapeStyles);

  return {
    shapeData,
    level: level,
    rounds: rounds,
    currentRound: 1,
    score: 0,
    scorePayload,
  };
};

export default stateGenerator;

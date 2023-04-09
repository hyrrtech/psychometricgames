import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const spawnAreaHeight = height * 0.65;
const spawnAreaWidth = width * 0.95;

const time = {minutes: 2, seconds: 30};

const butterflyProbability = 0.5;
const generateButterflies = (
  num_of_butterflies,
  SpiderX,
  SpiderY,
  SpiderSize,
) => {
  let ButterFlyArray = [];

  for (let i = 0; i < num_of_butterflies; i++) {
    let newButterfly = {};
    const ButterflySize =
      Math.floor((Math.random() * spawnAreaHeight) / 12) + 70;
    const ButterflyMaxTop = spawnAreaHeight - ButterflySize;
    const ButterflyMaxLeft = spawnAreaWidth - ButterflySize;
    let ButterflyY, ButterflyX;
    do {
      ButterflyY = Math.floor(Math.random() * ButterflyMaxTop);
      ButterflyX = Math.floor(Math.random() * ButterflyMaxLeft);
    } while (
      (ButterflyX + ButterflySize > SpiderX &&
        ButterflyY + ButterflySize > SpiderY &&
        ButterflyX < SpiderX + SpiderSize &&
        ButterflyY < SpiderY + SpiderSize) ||
      ButterFlyArray.some(
        butterfly =>
          butterfly.butterflyPos.x + butterfly.butterflyDimension >
            ButterflyX &&
          butterfly.butterflyPos.y + butterfly.butterflyDimension >
            ButterflyY &&
          butterfly.butterflyPos.x < ButterflyX + ButterflySize &&
          butterfly.butterflyPos.y < ButterflyY + ButterflySize,
      )
    );
    const ButterflyRotate = `${Math.floor(Math.random() * 360)}deg`;
    newButterfly.butterflyPos = {x: ButterflyX, y: ButterflyY};
    newButterfly.butterflyDimension = ButterflySize;
    newButterfly.butterflyRotate = ButterflyRotate;
    newButterfly.show = Math.random() < butterflyProbability;
    ButterFlyArray.push(newButterfly);
  }
  return ButterFlyArray;
};

const stateGenerator = () => {
  const SpiderSize = Math.floor((Math.random() * spawnAreaHeight) / 6) + 100;
  const SpiderMaxTop = spawnAreaHeight - SpiderSize;
  const SpiderMaxLeft = spawnAreaWidth - SpiderSize;
  const SpiderY = Math.floor(Math.random() * SpiderMaxTop);
  const SpiderX = Math.floor(Math.random() * SpiderMaxLeft);
  const SpiderRotate = `${Math.floor(Math.random() * 360)}deg`;

  return {
    spiderPos: {x: SpiderX, y: SpiderY},
    spiderDimension: SpiderSize,
    spiderRotate: SpiderRotate,
    score: 0,
    killCount: 0,
    butterflies: generateButterflies(3, SpiderX, SpiderY, SpiderSize),
  };
};

export {stateGenerator, time, butterflyProbability};

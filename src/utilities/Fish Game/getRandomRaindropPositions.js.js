import constants from './constants';
const {poundAreaHeight, poundAreaWidth, rainDropSize} = constants;

const randomInterval = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

const randomRaindropPositions = num_of_rainDrops => {
  let rainDrops = [];
  let intervalGap = randomInterval(1000, 2000);
  for (let i = 0; i < num_of_rainDrops; i++) {
    let newRaindrop = {};
    const raindropMaxTop = poundAreaHeight - rainDropSize;
    const raindropMaxLeft = poundAreaWidth - rainDropSize;
    let raindropY, raindropX;
    do {
      raindropY = Math.floor(Math.random() * raindropMaxTop);
      raindropX = Math.floor(Math.random() * raindropMaxLeft);
    } while (
      rainDrops.some(
        raindrop =>
          raindrop.position.x + rainDropSize > raindropX &&
          raindrop.position.y + rainDropSize > raindropY &&
          raindrop.position.x < raindropX + rainDropSize &&
          raindrop.position.y < raindropY + rainDropSize,
      )
    );

    newRaindrop = {
      position: {x: raindropX, y: raindropY},
      id: i,
      interval: randomInterval(1000, num_of_rainDrops * 1000) + intervalGap * i,
    };

    rainDrops.push(newRaindrop);
  }
  return rainDrops;
};

export default randomRaindropPositions;

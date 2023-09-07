import randomPoint from './randomPoint';
function createBalloonArray(LENGTH_OF_ARRAY, NUMBER_OF_WEIGHTS) {
  // Calculate the number of each balloon color
  const amountOfEachBalloon = Math.floor(LENGTH_OF_ARRAY / 3);

  // Create an array of objects with POP_POINT and BALLOON_COLOR
  const balloonObjects = [];

  for (let i = 0; i < LENGTH_OF_ARRAY; i++) {
    let color;
    let popPoint;

    if (i < amountOfEachBalloon) {
      color = '#000000';
      popPoint = randomPoint(NUMBER_OF_WEIGHTS * 0.4, NUMBER_OF_WEIGHTS * 0.5);
    } else if (i < amountOfEachBalloon * 2) {
      color = '#ff0000';
      popPoint = randomPoint(NUMBER_OF_WEIGHTS * 0.6, NUMBER_OF_WEIGHTS * 0.7);
    } else {
      color = '#ffff00';
      popPoint = randomPoint(NUMBER_OF_WEIGHTS * 0.8, NUMBER_OF_WEIGHTS * 0.9);
    }

    balloonObjects.push({pop_point: popPoint, balloon_color: color});
  }

  // Shuffle the array to randomize the order
  for (let i = balloonObjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [balloonObjects[i], balloonObjects[j]] = [
      balloonObjects[j],
      balloonObjects[i],
    ];
  }

  return balloonObjects;
}

export default createBalloonArray;

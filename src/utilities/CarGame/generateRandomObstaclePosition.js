import constants from './constants';
const {obstacleRightXPosition, obstacleLeftXPosition, obstacleCenterXPosition} =
  constants;

//function to generate either one of the three positions

const generateRandomObstaclePosition = () => {
  const random = Math.random() * 3;
  if (random < 1) return {x: obstacleLeftXPosition, position: 'left'};
  if (random < 2) return {x: obstacleCenterXPosition, position: 'center'};
  return {x: obstacleRightXPosition, position: 'right'};
};

export default generateRandomObstaclePosition;

import {Dimensions} from 'react-native';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');

const SKY_HEIGHT = WINDOW_HEIGHT * 0.25;
const ROAD_HEIGHT = WINDOW_HEIGHT * 2.42;
const ROAD_WIDTH = WINDOW_WIDTH * 0.3;
const ROAD_LINE_HEIGHT = ROAD_HEIGHT * 0.3;
const ROAD_LINE_WIDTH = ROAD_WIDTH * 0.05;

const OBSTACLE_HEIGHT = WINDOW_HEIGHT * 0.2;
const OBSTACLE_WIDTH = ROAD_WIDTH * 0.24;

const CAR_HEIGHT = WINDOW_HEIGHT * 0.2;
const CAR_WIDTH = ROAD_WIDTH * 0.24;

//car positions
const carCenterXPosition = ROAD_WIDTH / 2 - CAR_WIDTH + ROAD_LINE_WIDTH;
const carLeftXPosition = ROAD_LINE_WIDTH / 5;
const carRightXPosition = ROAD_WIDTH - CAR_WIDTH - 3 * ROAD_LINE_WIDTH;
const carYPosition = ROAD_HEIGHT - CAR_HEIGHT;

//obstacle positions
const obstacleCenterXPosition =
  ROAD_WIDTH / 2 - OBSTACLE_WIDTH + ROAD_LINE_WIDTH;
const obstacleLeftXPosition = ROAD_LINE_WIDTH / 5;
const obstacleRightXPosition =
  ROAD_WIDTH - OBSTACLE_WIDTH - 3 * ROAD_LINE_WIDTH;

const MIN_SPEED = 700;
const MAX_SPEED = 1200;
const INVINCIBILITY_DURATION = 3000;
const DISTANCE_BETWEEN_LINES = ROAD_LINE_HEIGHT;

export default {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SKY_HEIGHT,
  ROAD_HEIGHT,
  ROAD_WIDTH,
  ROAD_LINE_HEIGHT,
  ROAD_LINE_WIDTH,
  OBSTACLE_HEIGHT,
  OBSTACLE_WIDTH,
  MIN_SPEED,
  MAX_SPEED,
  INVINCIBILITY_DURATION,
  CAR_HEIGHT,
  CAR_WIDTH,
  carCenterXPosition,
  carLeftXPosition,
  carRightXPosition,
  carYPosition,
  obstacleCenterXPosition,
  obstacleLeftXPosition,
  obstacleRightXPosition,
  DISTANCE_BETWEEN_LINES,
};

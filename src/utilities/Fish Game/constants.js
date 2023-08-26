import {Dimensions} from 'react-native';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const poundAreaHeight = WINDOW_HEIGHT * 0.7;
const poundAreaWidth = WINDOW_WIDTH * 0.8;
const rainDropSize = WINDOW_WIDTH * 0.25;
const speed = 50;

const fishSize = WINDOW_WIDTH * 0.2;

export default {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  rainDropSize,
  poundAreaHeight,
  poundAreaWidth,
  speed,
  fishSize,
};

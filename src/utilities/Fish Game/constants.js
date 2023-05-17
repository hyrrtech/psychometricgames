import {Dimensions} from 'react-native';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const poundAreaHeight = WINDOW_HEIGHT * 0.7;
const poundAreaWidth = WINDOW_WIDTH * 0.8;
const speed = 50;
const fishHeight = 35;
const fishWidth = 80;

export default {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  poundAreaHeight,
  poundAreaWidth,
  speed,
  fishHeight,
  fishWidth,
};

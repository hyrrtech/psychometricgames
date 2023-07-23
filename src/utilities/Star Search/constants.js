import {Dimensions} from 'react-native';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const spawnAreaHeight = WINDOW_HEIGHT * 0.7;
const spawnAreaWidth = WINDOW_WIDTH * 0.9;
const shapeSize = spawnAreaHeight * 0.1;

export default {
  spawnAreaHeight,
  spawnAreaWidth,
  shapeSize,
};

import {Dimensions} from 'react-native';
const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const spawnAreaHeight = WINDOW_HEIGHT * 0.7;
const spawnAreaWidth = WINDOW_WIDTH * 0.9;
const lillipadSize = spawnAreaHeight * 0.15;
const followerFrogSize = lillipadSize * 0.4;
const leaderFrogSize = lillipadSize * 0.5;
const speed = 500;

export default {
  spawnAreaHeight,
  spawnAreaWidth,
  lillipadSize,
  followerFrogSize,
  leaderFrogSize,
  speed,
};

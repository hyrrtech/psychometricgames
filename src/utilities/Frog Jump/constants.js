import {Dimensions} from 'react-native';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const spawnAreaHeight = WINDOW_HEIGHT * 0.7;
const spawnAreaWidth = WINDOW_WIDTH * 0.9;
const lillipadSize = spawnAreaHeight * 0.15;
const followerFrogSize = lillipadSize * 1;
const leaderFrogSize = lillipadSize * 1.3;
const speed = 200;
const MAX_NUM_OF_JUMPS = 40;
const NUM_OF_LILLIPADS = 10;

export default {
  spawnAreaHeight,
  spawnAreaWidth,
  lillipadSize,
  followerFrogSize,
  leaderFrogSize,
  speed,
  MAX_NUM_OF_JUMPS,
  NUM_OF_LILLIPADS,
};

import {Dimensions} from 'react-native';
import {interpolate} from 'flubber';
import {frames} from '../../components/Frog Game/frames';
const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const spawnAreaHeight = WINDOW_HEIGHT * 0.7;
const spawnAreaWidth = WINDOW_WIDTH * 0.9;
const lillipadSize = spawnAreaHeight * 0.15;
const followerFrogSize = lillipadSize * 1;
const leaderFrogSize = lillipadSize * 1.3;
const speed = 200;
// const start = performance.now();

// const interpolations = ;

// const end = performance.now();
// console.log(end - start);

export default {
  spawnAreaHeight,
  spawnAreaWidth,
  lillipadSize,
  followerFrogSize,
  leaderFrogSize,
  speed,
  // interpolations,
};

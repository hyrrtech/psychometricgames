import {Dimensions} from 'react-native';
const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('screen');
const tileSize = (WINDOW_HEIGHT / WINDOW_WIDTH) * 30;
const lineWidth = tileSize * 0.33;
const lineHeight = tileSize * 0.1;
const pirateLineWidth = tileSize * 0.07;
const pirateLineHeight = tileSize * 0.07;
const shipSize = tileSize * 0.65;
const time_to_cover_each_tile = 650;

export default {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  tileSize,
  lineWidth,
  lineHeight,
  pirateLineWidth,
  pirateLineHeight,
  shipSize,
  time_to_cover_each_tile,
};

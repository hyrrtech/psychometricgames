import {Dimensions} from 'react-native';

export const {width} = Dimensions.get('window');
export const trainSize = width * 0.12;
export const pathSize = width * 0.06;
export const curveSize = pathSize + 5;
export const switchSize = width * 0.12;
export const stationSize = width * 0.18;
export const speed = 50;
export const initialSpawnSpeed = 4000;
export const time = {minutes: 4, seconds: 0};

export const originalSwitchDirections = {
  1: ['vertical'],
  2: ['vertical_left'],
  3: ['horizontal_left', 'horizontal'],
  4: ['horizontal', 'horizontal_right'],
  5: ['vertical_left_down', 'vertical'],
  6: ['horizontal', 'horizontal_left'],
  7: ['vertical_left_down', 'vertical'],
  8: ['vertical', 'vertical_right'],
  9: ['horizontal', 'horizontal_left_up'],
  10: ['vertical_right', 'vertical'],
  11: ['vertical_right', 'vertical'],
  12: ['vertical_left', 'vertical'],
  13: ['horizontal_left', 'horizontal'],
  14: ['vertical', 'vertical_left'],
  15: ['horizontal_right', 'horizontal'],
};

export const switchDirectionArray = Object.values(originalSwitchDirections).map(
  switchDirection => switchDirection[0],
);
